import React, { useEffect, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

function useCountdown(targetISO:string){
  const target=new Date(targetISO).getTime()
  const [now,setNow]=useState(Date.now())
  useEffect(()=>{
    const id=setInterval(()=>setNow(Date.now()),1000)
    return ()=>clearInterval(id)
  },[])
  const diff=Math.max(0,target-now)
  const days=Math.floor(diff/(1000*60*60*24))
  const hours=Math.floor((diff/(1000*60*60))%24)
  const minutes=Math.floor((diff/(1000*60))%60)
  const seconds=Math.floor((diff/1000)%60)
  return {diff,days,hours,minutes,seconds}
}

export default function Countdown(){
  const c=useCountdown(siteConfig.eventDateISO)
  if (c.diff === 0) {
    return null
  }
  return (
    <section id="details" className="my-8">
      <h2 className="text-2xl font-semibold">Countdown to {siteConfig.eventName}</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Days">{c.days}</Card>
        <Card label="Hours">{String(c.hours).padStart(2,'0')}</Card>
        <Card label="Minutes">{String(c.minutes).padStart(2,'0')}</Card>
        <Card label="Seconds">{String(c.seconds).padStart(2,'0')}</Card>
      </div>
    </section>
  )
}

function Card({children,label}:{children:React.ReactNode,label:string}){
  return (
    <div className="bg-white rounded p-4 shadow text-center">
      <div className="text-3xl font-bold">{children}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  )
}
