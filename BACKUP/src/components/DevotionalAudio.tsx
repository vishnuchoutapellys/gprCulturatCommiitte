import React, { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

// Do NOT statically bundle the large local MP3 by default.
// Use `siteConfig.audio.music` (an external URL) to enable audio on deployments,
// or set `VITE_INCLUDE_AUDIO=true` and provide a hosted URL via `siteConfig` for controlled builds.

const STORAGE_KEY = 'devotional_music_muted'
// Volume settings (0.0 - 1.0). Increase these for louder playback.
const MUSIC_VOLUME = 1.0
const BELL_VOLUME = 0.0

export default function DevotionalAudio(){
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const bellRef = useRef<HTMLAudioElement | null>(null)
  const bellTimerRef = useRef<number | null>(null)
  const periodicTimerRef = useRef<number | null>(null)
  const playingRef = useRef<boolean>(false)

  const [muted, setMuted] = useState<boolean>(() => {
    try{ return localStorage.getItem(STORAGE_KEY) === 'true' }catch{ return false }
  })
  const mutedRef = useRef(muted)
  mutedRef.current = muted

  const [playing, setPlaying] = useState(false)
  // keep ref in sync so timers can read current playing state
  useEffect(()=>{ playingRef.current = playing },[playing])

  // helper: schedule one bell after short delay (only if unmuted)
  const scheduleBellOnce = ()=>{
    if(!bellRef.current) return
    if(mutedRef.current) return
    // do not play bell if devotional music is currently playing
    if(playingRef.current) return
    if(bellTimerRef.current) window.clearTimeout(bellTimerRef.current)
    bellTimerRef.current = window.setTimeout(()=>{
      try{ if(!playingRef.current) bellRef.current && bellRef.current.play().catch(()=>{}) }catch{}
    }, 1000) as unknown as number
  }

  // helper: schedule recurring bells at randomized intervals
  const schedulePeriodicBells = ()=>{
    if(periodicTimerRef.current) window.clearTimeout(periodicTimerRef.current)
    const scheduleNext = ()=>{
      const delay = 60000 + Math.floor(Math.random()*80000) // 60s-140s
      periodicTimerRef.current = window.setTimeout(()=>{
        // only play periodic bells when not muted and devotional music is not playing
        if(!mutedRef.current && bellRef.current && !playingRef.current){
          try{ bellRef.current.currentTime = 0; bellRef.current.play().catch(()=>{}) }catch{}
        }
        scheduleNext()
      }, delay) as unknown as number
    }
    scheduleNext()
  }

  useEffect(()=>{
    // ensure audio elements exist in DOM via refs
    let music = musicRef.current
    let bell = bellRef.current
    const attachProps = ()=>{
      music = musicRef.current
      bell = bellRef.current
      if(music){
        music.loop = true
        music.preload = 'auto'
        music.volume = MUSIC_VOLUME
      }
      if(bell){
        bell.preload = 'none'
        bell.volume = BELL_VOLUME
      }
    }

    attachProps()

    // Utility: wait for canplaythrough or timeout
    const waitForCanPlay = (el: HTMLMediaElement, timeout = 3000) => new Promise<void>((resolve)=>{
      if(!el) return resolve()
      if(el.readyState >= 4) return resolve()
      const onCan = ()=>{
        cleanup()
        resolve()
      }
      const onErr = ()=>{
        cleanup()
        resolve()
      }
      const cleanup = ()=>{
        el.removeEventListener('canplaythrough', onCan)
        el.removeEventListener('error', onErr)
      }
      el.addEventListener('canplaythrough', onCan)
      el.addEventListener('error', onErr)
      setTimeout(()=>{ cleanup(); resolve() }, timeout)
    })

    const resolvedSrc = siteConfig.audio?.music || ''
    const GLOBAL_KEY = '__DEVOTIONAL_MUSIC_INSTANCE'

    // Try muted autoplay: try programmatic Audio first (often more reliable), then DOM audio
    const tryMutedAutoplay = async ()=>{
      attachProps()
      console.debug('DevotionalAudio: resolvedSrc=', resolvedSrc)

      // If there's no configured audio source, skip autoplay attempts entirely
      if(!resolvedSrc) return

      // 1) Programmatic Audio attempt
      try{
        // Reuse a global audio instance to avoid creating multiple overlapping players
        let prog = (window as any)[GLOBAL_KEY] as HTMLAudioElement | undefined
        if(!prog){
          prog = new Audio(resolvedSrc)
          prog.loop = true
          prog.muted = true
          prog.volume = MUSIC_VOLUME
          // improve mobile autoplay reliability
          try{ (prog as any).playsInline = true }catch{}
          try{ (prog as any).crossOrigin = 'anonymous' }catch{}
          ;(window as any)[GLOBAL_KEY] = prog
        } else {
          // if global exists but src differs, update it
          try{ if(prog.src !== resolvedSrc) prog.src = resolvedSrc }catch{}
        }
        console.debug('DevotionalAudio: attempting programmatic muted play', prog.src)
        await waitForCanPlay(prog, 4000)
        const playP = prog.play()
        if(playP && typeof (playP as any).then === 'function') await playP
        musicRef.current = prog as unknown as HTMLAudioElement
        setPlaying(true)
        console.debug('DevotionalAudio: programmatic muted play succeeded')
        if(!mutedRef.current){
          const onFirstGesture = async ()=>{
            try{ prog!.muted = false; setMuted(false); try{ localStorage.setItem(STORAGE_KEY,'false') }catch{} }catch(e){ console.debug('unmute gesture failed', e) }
          }
          window.addEventListener('pointerdown', onFirstGesture, { once: true })
          window.addEventListener('keydown', onFirstGesture, { once: true })
        }
        return
      }catch(errProg){
        console.debug('DevotionalAudio: programmatic muted play failed', errProg)
      }

      // 2) DOM audio element attempt
      try{
        if(!music && musicRef.current) music = musicRef.current
        if(!music) throw new Error('no DOM audio available')
        music.muted = true
        await waitForCanPlay(music, 4000)
        const p = music.play()
        if(p && typeof (p as any).then === 'function') await p
        setPlaying(true)
        console.debug('DevotionalAudio: DOM muted play succeeded', music.currentSrc)
        if(!mutedRef.current){
          const onFirstGesture = async ()=>{
            try{ music!.muted = false; setMuted(false); try{ localStorage.setItem(STORAGE_KEY,'false') }catch{} }catch(e){ console.debug('unmute gesture failed', e) }
          }
          window.addEventListener('pointerdown', onFirstGesture, { once: true })
          window.addEventListener('keydown', onFirstGesture, { once: true })
        }
        return
      }catch(errDOM){
        console.debug('DevotionalAudio: DOM muted play failed', errDOM)
      }

      setPlaying(false)
    }

    tryMutedAutoplay()

    // Global first-gesture handler (no UI): unmute and play on first user interaction
    const handleFirstUserGesture = async ()=>{
      try{
        attachProps()
        let m = musicRef.current
        if(!m){
          if(!resolvedSrc) return
          let prog = (window as any)[GLOBAL_KEY] as HTMLAudioElement | undefined
          if(!prog){
            prog = new Audio(resolvedSrc)
            prog.loop = true
            prog.volume = MUSIC_VOLUME
            prog.muted = false
            try{ (prog as any).playsInline = true }catch{}
            try{ (prog as any).crossOrigin = 'anonymous' }catch{}
            ;(window as any)[GLOBAL_KEY] = prog
          } else {
            try{ if(prog.src !== resolvedSrc) prog.src = resolvedSrc }catch{}
            prog.muted = false
          }
          musicRef.current = prog as unknown as HTMLAudioElement
          m = prog as unknown as HTMLAudioElement
          try{ await waitForCanPlay(prog, 3000) }catch{}
        }
        try{ m.muted = false; await m.play(); setPlaying(true); }catch(e){ console.debug('first-gesture play failed', e) }
        setMuted(false)
        try{ localStorage.setItem(STORAGE_KEY,'false') }catch{}
        // Only schedule bells when devotional music is not playing
        if(!playingRef.current){
          scheduleBellOnce()
          schedulePeriodicBells()
        }
      }catch(e){ console.debug('handleFirstUserGesture error', e) }
      window.removeEventListener('pointerdown', handleFirstUserGesture)
      window.removeEventListener('keydown', handleFirstUserGesture)
    }

    window.addEventListener('pointerdown', handleFirstUserGesture, { once: true })
    window.addEventListener('keydown', handleFirstUserGesture, { once: true })
    // also attempt to play on first scroll (some mobile browsers treat scroll as a user gesture)
    const onFirstScroll = async ()=>{
      try{
        // call the same first-gesture handler used for pointer/keyboard
        await handleFirstUserGesture()
      }catch(e){ console.debug('scroll-play failed', e) }
      window.removeEventListener('scroll', onFirstScroll)
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true })

    const handleVisibility = ()=>{
      attachProps()
      if(document.visibilityState === 'hidden'){
        try{ music && !music.paused && music.pause() }catch{}
      } else {
        try{ if(music && playing && !mutedRef.current) music.play().catch(()=>{}) }catch{}
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // diagnostics: listen for audio events
    const installDiagnostics = ()=>{
      attachProps()
      if(!music) return
      const onPlay = ()=> setPlaying(true)
      const onPause = ()=> setPlaying(false)
      const onError = (e: any)=> console.warn('DevotionalAudio error', e, music?.currentSrc)
      music.addEventListener('play', onPlay)
      music.addEventListener('pause', onPause)
      music.addEventListener('error', onError)
      return ()=>{
        try{ if(music) music.removeEventListener('play', onPlay) }catch{}
        try{ if(music) music.removeEventListener('pause', onPause) }catch{}
        try{ if(music) music.removeEventListener('error', onError) }catch{}
      }
    }
    const uninstallDiag = installDiagnostics()

    return ()=>{
      document.removeEventListener('visibilitychange', handleVisibility)
      if(uninstallDiag) uninstallDiag()
      if(bellTimerRef.current) window.clearTimeout(bellTimerRef.current)
      if(periodicTimerRef.current) window.clearTimeout(periodicTimerRef.current)
      try{
        if(musicRef.current){
          try{
            const GLOBAL_KEY = '__DEVOTIONAL_MUSIC_INSTANCE'
            if((window as any)[GLOBAL_KEY] && (window as any)[GLOBAL_KEY] === musicRef.current){
              // shared global instance: only pause so it can be reused
              musicRef.current.pause()
            } else {
              // local instance: pause and release src
              musicRef.current.pause(); musicRef.current.src = ''
            }
          }catch{ musicRef.current.pause() }
        }
      }catch{}
      try{ if(bellRef.current){ bellRef.current.pause(); bellRef.current.src=''; } }catch{}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePlayToggle = async ()=>{
    const music = musicRef.current
    if(!music) return
    try{
      if(playing){
        // pause playback and stop bells
        try{ music.pause() }catch{}
        setPlaying(false)
        playingRef.current = false
        if(bellTimerRef.current) window.clearTimeout(bellTimerRef.current)
        if(periodicTimerRef.current) window.clearTimeout(periodicTimerRef.current)
        // resume bell scheduling when music is paused (if not muted)
        if(!mutedRef.current){
          scheduleBellOnce()
          schedulePeriodicBells()
        }
      } else {
        // play (ensure unmuted)
        music.muted = false
        setMuted(false)
        try{ await music.play() }catch(e){ console.debug('play failed', e) }
        setPlaying(true)
        playingRef.current = true
        // when music starts, ensure bells are not scheduled
        if(bellTimerRef.current) window.clearTimeout(bellTimerRef.current)
        if(periodicTimerRef.current) window.clearTimeout(periodicTimerRef.current)
      }
      try{ localStorage.setItem(STORAGE_KEY, mutedRef.current ? 'true' : 'false') }catch{}
    }catch(e){ console.debug('handlePlayToggle error', e) }
  }

  return (
    <>
      <div className="fixed z-40 right-4 bottom-20 md:right-6 md:bottom-20">
        <button
          aria-pressed={playing}
          aria-label={playing ? 'Pause devotional music' : 'Play devotional music'}
          title={playing ? 'Pause devotional music' : 'Play devotional music'}
          onClick={handlePlayToggle}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 text-white shadow-lg hover:scale-105 transform transition-transform focus:outline-none"
        >
          <span className="text-xl">{playing ? '⏸️' : '▶️'}</span>
        </button>
      </div>

      {/* music is handled via a single programmatic Audio instance (no DOM <audio> element) */}
      <audio ref={bellRef} src={siteConfig.audio?.bell || '/assets/audio/temple-bell.mp3'} preload="none" style={{display:'none'}} />
    </>
  )
}
