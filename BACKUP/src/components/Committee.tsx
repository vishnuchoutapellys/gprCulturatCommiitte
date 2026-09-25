import React from 'react'
import { siteAssets, siteConfig } from '../data/siteConfig'
import srinivasGoud from '../assets/committee/srinivas-goud.jpeg'
import nageshwar from '../assets/committee/nageshwar.png'
import vishnuImg from '../assets/committee/vishnu.jpeg'
import raviImg from '../assets/committee/ravi.jpeg'
import srinivasImg from '../assets/committee/srinivas.jpeg'
import jagadeeshImg from '../assets/committee/jagadeesh.png'
import pradeepImg from '../assets/committee/pradeep.jpeg'
import prasantImg from '../assets/committee/prasant.png'
import rkReddy from '../assets/committee/rkReddy.jpeg'




export default function Committee(){
  const members = siteAssets.committeeMembers
  // Advisory committee names (use same portrait style as committee members)
  const advisoryMembers = [
    { name: 'Srinivas Goud', role: '', phone: '+91 9036397648', img: srinivasGoud },
    { name: 'Nageshwar Rao', role: '', phone: '+91 7842422288', img: nageshwar },
    { name: 'Vishnu', role: '', phone: '+91 9014249898', img: vishnuImg },
    { name: 'Ravi', role: '', phone: '+91 7382460633', img: raviImg },
    { name: 'Srinivas', role: '', phone: '+91 9000099243', img: srinivasImg },
    { name: 'Jagadeesh', role: '', phone: '+91 9247366539', img: jagadeeshImg },
    { name: 'Pradeep', role: '', phone: '+91 9052949582', img: pradeepImg },
    { name: 'Prashanth', role: '', phone: '+91 9494645460', img: prasantImg },
    { name: 'RK Reddy', role: '', phone: '+91 9347392340', img: rkReddy }

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
