import React, { useState } from 'react'
import { siteConfig } from '../data/siteConfig'

export default function Contact(){
  const [open, setOpen] = useState(false)
  return (
    <section id="contact" className="mt-8">
      <div className="mt-4">
        <button
          className="w-full text-left flex items-center justify-between p-4 devotional-gradient text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          aria-expanded={open}
          aria-controls="contact-panel"
          aria-label="Toggle contact details"
          onClick={()=>setOpen(v=>!v)}
        >
          <div className="text-left">
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-amber-100">Get in touch with the organizing team</div>
          </div>
          <svg className={`w-5 h-5 text-white transition-transform ${open? 'rotate-180':'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div id="contact-panel" className={`mt-3 overflow-hidden transition-all duration-300 ${open? 'max-h-96 opacity-100':'max-h-0 opacity-0'}`} style={{transitionProperty:'max-height, opacity'}}>
          <div className="bg-white rounded shadow p-4 grid md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold">{siteConfig.associationName}</div>
              <div className="text-sm text-slate-600">{siteConfig.venue.address}</div>
            </div>
            <div>
              {siteConfig.contact?.phone && <div className="text-sm"><span className="font-semibold">Phone:</span> <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g,'')}`}>{siteConfig.contact.phone}</a></div>}
              {siteConfig.contact?.whatsapp && <div className="text-sm"><span className="font-semibold">WhatsApp:</span> <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer">Message on WhatsApp</a></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
