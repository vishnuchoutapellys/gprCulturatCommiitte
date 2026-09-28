import React from 'react'
import { siteAssets, siteConfig } from '../data/siteConfig'
import dineshImg from '../assets/committee/dinesh.png'
import altImg from '../assets/committee/alt.jpg'






export default function Committee(){
  const members = siteAssets.committeeMembers
  // Advisory committee names (use same portrait style as committee members)
  const advisoryMembers = [
    { name: 'Naga vardhan', role: '', phone: '+91 9160962430', img: altImg },
    { name: 'Vishwanath', role: '', phone: '+91 9949901512', img: altImg },
    { name: 'Shekar Chaganti', role: '', phone: '+91 9966155440', img: altImg },
    { name: 'Sandeep', role: '', phone: '+91 6303054827', img: altImg },
    { name: 'Harish', role: '', phone: '+91 9666791115', img: altImg },
    { name: 'Ravinder', role: '', phone: '+91 8142549091', img: altImg },
    { name: 'Arun Yadav', role: '', phone: '+91 9966319988', img: altImg },
    { name: 'Arun Goud', role: '', phone: '+91 9010000778', img: altImg },
    { name: 'Srinivas', role: '', phone: '+91 9885640480', img: altImg },
     { name: 'Harsha', role: '', phone: '+91 9912468333', img: altImg },
    { name: 'Kumar', role: '', phone: '+91 9000283108', img: altImg },
    { name: 'RC Reddy', role: '', phone: '+91 9491514272  ', img: altImg }

  ]
  return (
    <section id="committee" className="mt-8">
      <h3 className="text-2xl font-semibold">Organizers Committee</h3>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4">
        {members.map(m=> {
          const digitsOnly = (m.phone || '').replace(/\D/g,'')
          const normalized = digitsOnly.length === 10 ? '91' + digitsOnly : digitsOnly
          const displayPhone = normalized ? `+${normalized}` : ''
          const telHref = normalized ? `tel:+${normalized}` : '#'
          return (
            <div key={m.name} className="bg-white p-3 md:p-4 rounded text-center shadow">
              <img src={m.img} alt={`${m.name} portrait`} className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover" loading="lazy"/>
              <div className="font-semibold mt-2 text-sm md:text-lg break-words">{m.name}</div>
              {m.role && <div className="text-xs md:text-sm text-slate-600 leading-tight break-words">{m.role}</div>}
              {displayPhone && (
                <div className="mt-2">
                  <a href={telHref} className="inline-flex items-center gap-2 text-xs md:text-sm text-saffron hover:underline whitespace-normal break-words">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.2.36 2.37.72 3.5a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.76-1.76a2 2 0 0 1 2.11-.45c1.13.36 2.3.6 3.5.72A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="break-words">{displayPhone}</span>
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <h3 className="text-2xl font-semibold mt-8">Advisory Committee</h3>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4">
        {advisoryMembers.map(m=> {
          const digitsOnly = (m.phone || '').replace(/\D/g,'')
          const normalized = digitsOnly.length === 10 ? '91' + digitsOnly : digitsOnly
          const displayPhone = normalized ? `+${normalized}` : ''
          const telHref = normalized ? `tel:+${normalized}` : '#'
          return (
            <div key={m.name} className="bg-white p-3 md:p-4 rounded text-center shadow">
              <img src={m.img} alt={`${m.name} portrait`} className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover" loading="lazy"/>
              <div className="font-semibold mt-2 text-sm md:text-lg break-words">{m.name}</div>
              {m.role && <div className="text-xs md:text-sm text-slate-600 leading-tight break-words">{m.role}</div>}
              {displayPhone && (
                <div className="mt-2">
                  <a href={telHref} className="inline-flex items-center gap-2 text-xs md:text-sm text-saffron hover:underline whitespace-normal break-words">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.2.36 2.37.72 3.5a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.76-1.76a2 2 0 0 1 2.11-.45c1.13.36 2.3.6 3.5.72A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="break-words">{displayPhone}</span>
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
