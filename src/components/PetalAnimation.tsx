import React, { useRef, useEffect } from 'react'

type Petal = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vrot: number
  size: number
  color: string
  type: number
}

// single uniform petal color for consistent look
const PETAL_COLOR = '#F7A6B2'

export default function PetalAnimation(){
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(()=>{
    const canvas = ref.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')!

    let width = 0
    let height = 0
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const petals: Petal[] = []
    // keep exactly 50 petals on screen for a steady, devotional shower
    const MIN_COUNT = 100
    const MAX = 100

    // central safe zone (percent of width/height) where petals should avoid
    const SAFE = { xStart: 0.3, xEnd: 0.7, yStart: 0.2, yEnd: 0.8 }

    function resize(){
      dpr = Math.max(1, window.devicePixelRatio || 1)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }

    function spawn(){
      // spawn at top area, avoid safe center zone
      const marginX = 0
      let x = Math.random() * (width - marginX*2) + marginX
      // if x falls into center safe zone, nudge left or right
      const cx0 = SAFE.xStart * width
      const cx1 = SAFE.xEnd * width
      if(x > cx0 && x < cx1){
        x = (Math.random() > 0.5) ? cx0 - Math.random()*40 : cx1 + Math.random()*40
      }
      const p: Petal = {
        x,
        y: -20 - Math.random()*60,
        vx: (Math.random()-0.5) * 0.6,
        vy: 0.6 + Math.random()*1.0,
        rot: Math.random()*Math.PI*2,
        vrot: (Math.random()-0.5) * 0.03,
        // much smaller petals by request (range ~6-12)
        size: 6 + Math.random()*6,
        color: PETAL_COLOR,
        type: Math.random()>0.6?1:0
      }
      petals.push(p)
    }

    let running = true
    let last = performance.now()

    function update(now: number){
      const dt = Math.min(40, now - last) / 16.67
      last = now

      // ensure we maintain target count quickly
      if(petals.length < MIN_COUNT) {
        // spawn multiple to catch up occasionally
        spawn()
      }

      ctx.clearRect(0,0,width,height)

      for(let i=petals.length-1;i>=0;i--){
        const p = petals[i]
        p.x += p.vx * dt * 1.2
        p.y += p.vy * dt
        p.vx += Math.sin(now/2000 + i) * 0.002 * dt
        p.rot += p.vrot * dt

        // gentle horizontal drift
        const sway = Math.sin((p.y + i*10)/60) * (p.size/60)
        p.x += sway

        // draw petal
        drawPetal(ctx, p)

        // remove when off screen
        if(p.y - p.size > height + 50 || p.x < -100 || p.x > width + 100){
          petals.splice(i,1)
        }
      }

      if(running) requestAnimationFrame(update)
    }

    function drawPetal(ctx: CanvasRenderingContext2D, p: Petal){
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      // subtle shadow
      ctx.fillStyle = p.color
      const g = ctx.createLinearGradient(0, -p.size, 0, p.size)
      g.addColorStop(0, 'rgba(255,255,255,0.7)')
      g.addColorStop(0.35, p.color)
      g.addColorStop(1, 'rgba(0,0,0,0.06)')
      ctx.fillStyle = g

      // draw an elongated teardrop / petal
      ctx.beginPath()
      ctx.moveTo(0, -p.size*0.6)
      ctx.quadraticCurveTo(p.size*0.5, -p.size*0.2, 0, p.size)
      ctx.quadraticCurveTo(-p.size*0.5, -p.size*0.2, 0, -p.size*0.6)
      ctx.closePath()
      ctx.shadowColor = 'rgba(0,0,0,0.08)'
      ctx.shadowBlur = Math.max(1, p.size*0.1)
      ctx.fill()
      ctx.restore()
    }

    // initialize
    function init(){
      resize()
      // prefill to MIN_COUNT so 10 petals show initially
      for(let i=0;i<MIN_COUNT;i++) spawn()
      last = performance.now()
      requestAnimationFrame(update)
    }

    init()

    function onResize(){ resize() }
    window.addEventListener('resize', onResize)

    return ()=>{ running=false; window.removeEventListener('resize', onResize) }
  },[])

  return (
    <canvas ref={ref} className="petal-canvas" aria-hidden="true" />
  )
}
