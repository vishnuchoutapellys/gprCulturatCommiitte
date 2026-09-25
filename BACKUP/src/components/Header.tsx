import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { siteConfig, siteAssets } from '../data/siteConfig'

const nav = ['Home','About','Events','Schedule','Gallery','Committee','Venue','Contact']

export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40)
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[])

  // prevent body scroll when mobile nav is open
  useEffect(()=>{
    const original = document.body.style.overflow
    if(open){
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original || ''
    }
    return ()=>{ document.body.style.overflow = original }
  },[open])

  const handleNav=(id:string)=>{
    setOpen(false)
    const el=document.getElementById(id.toLowerCase())
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'})
  }

  return (
    <header className={`fixed z-30 w-full transition-shadow ${scrolled ? 'backdrop-blur bg-white/60 shadow' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <img src={siteAssets.logo} alt={`${siteConfig.associationName} logo`} className="w-full h-full object-cover"/>
          </div>
          <div>
            <div className={`font-display text-lg ${scrolled ? 'text-slate-800' : 'text-white'}`}>{siteConfig.associationName}</div>
            <div className={`${scrolled ? 'text-slate-600' : 'text-amber-200'} text-xs`}>{siteConfig.placeName}</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          {nav.map(n=> (
            <button key={n} onClick={()=>handleNav(n)} className={`focus:outline-none transition ${scrolled ? 'text-slate-800 hover:text-saffron' : 'text-white hover:text-amber-200'}`}>{n}</button>
          ))}
          <a href="#rsvp" className={`ml-4 px-4 py-2 rounded shadow ${scrolled ? 'bg-saffron text-white' : 'bg-amber-400 text-white'}`}>Join Us</a>
        </nav>

        <button
          className={`md:hidden p-3 rounded-md shadow-md border relative z-50 ${scrolled ? 'bg-white text-slate-800 border-slate-200 backdrop-blur-sm' : 'bg-white/20 text-white border-white/20 backdrop-blur-sm'} ${open ? 'invisible' : ''}`}
          aria-label="Open menu"
          onClick={()=>setOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 md:hidden z-[9998]">
          <div className="absolute inset-0 bg-black/80" onClick={()=>setOpen(false)} />
          <aside className="absolute right-0 top-0 w-72 h-full bg-white p-6 z-[9999] shadow-lg" onClick={e=>e.stopPropagation()} aria-label="Mobile navigation">
            <button
              className="absolute right-4 top-4 p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-900 z-[10000]"
              onClick={(e)=>{ e.stopPropagation(); setOpen(false) }}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <ul className="flex flex-col gap-4 mt-8">
              {nav.filter(n=> n !== 'About').map(n=> (
                <li key={n}>
                  <button onClick={()=>handleNav(n)} className="w-full text-left text-lg py-2">{n}</button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      , document.body)}
    </header>
  )
}
