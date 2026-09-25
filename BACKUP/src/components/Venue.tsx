import React, { useState } from 'react'
import { siteConfig } from '../data/siteConfig'

export default function Venue(){
  const [open, setOpen] = useState(false)
  return (
    <section id="venue" className="mt-8">
      <div className="mt-4">
        <button
          className="w-full text-left flex items-center justify-between p-4 devotional-gradient text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          aria-expanded={open}
          aria-controls="venue-panel"
          aria-label={`Toggle venue details`}
          onClick={()=>setOpen(v=>!v)}
        >
          <div className="text-left">
            <div className="font-semibold">{siteConfig.venue.name}</div>
            <div className="text-sm text-amber-100">{siteConfig.venue.address}</div>
          </div>
          <svg className={`w-5 h-5 text-white transition-transform ${open? 'rotate-180':'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div id="venue-panel" className={`mt-3 overflow-hidden transition-all duration-300 ${open? 'max-h-96 opacity-100':'max-h-0 opacity-0'}`} style={{transitionProperty:'max-height, opacity'}}>
          <div className="bg-white p-4 rounded-md shadow-inner border">
            <p className="text-slate-700">{(siteConfig.venue as any).description || 'Join us at the venue for all celebrations and events.'}</p>
            <div className="mt-4">
              <a href={siteConfig.venue.mapsUrl} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-saffron text-white rounded">Get Directions</a>
              {(siteConfig.venue as any).transitInfo && <div className="mt-2 text-sm text-slate-600">{(siteConfig.venue as any).transitInfo}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
