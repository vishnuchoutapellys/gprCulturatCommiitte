import React, { useState } from 'react'
import { siteConfig, eventDetails } from '../data/siteConfig'

export default function Donation(){
  const [open, setOpen] = useState(false)

  return (
    <section id="donation" className="mt-8">
      <div className="mt-4">
        <button
          aria-expanded={open}
          aria-controls="donation-panel"
          aria-label="Toggle donation details"
          onClick={()=>setOpen(v=>!v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 devotional-gradient text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-200"
        >
          <div className="text-left">
            <div className="font-semibold">Support Our Celebration</div>
            <div className="text-sm text-amber-100">Click to view donation options and details</div>
          </div>
          <svg className={`w-5 h-5 text-white transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div id="donation-panel" className={`mt-3 overflow-hidden transition-all duration-300 ${open ? 'max-h-[2000px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`} style={{transitionProperty:'max-height, opacity'}}>
          <div className="bg-cream p-6 rounded-lg shadow-lg">
            <div className="md:flex gap-6 items-start">
              <div className="bg-white p-4 rounded shadow w-full md:w-56 text-center flex flex-col justify-center">
                <div className="mt-3 text-sm text-slate-600">Scan QR to donate</div>
                {siteConfig.donation.qrImage && <img src={siteConfig.donation.qrImage} alt="" aria-hidden className="mx-auto mt-2 w-36 md:w-40" loading="lazy"/>}
                <div className="mt-3">
                  <DonateButton />
                </div>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <p className="text-slate-700 whitespace-pre-line">{eventDetails.intro}</p>
                <p className="mt-3 font-semibold text-slate-800">{eventDetails.donationMethodsNote}</p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">Sponsorship / Donation Items</h4>
                    <ul className="mt-2 list-disc pl-5 text-slate-700">
                      {eventDetails.donationRequirements.map((d,idx)=>(<li key={idx}>{d}</li>))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Annadanam (20/09/2026) contributions(Sponcered by: GOTHIC Pangea Community)</h4>
                    <ul className="mt-2 list-disc pl-5 text-slate-700">
                      {eventDetails.annadanamContributions.map((a,idx)=>(<li key={idx}>{a}</li>))}
                    </ul>
                  </div>
                </div>

                <div className="mt-2 text-sm text-slate-600">Please confirm sponsorship with the organizing team before purchasing to avoid duplication.</div>

                <div className="mt-4">
                  {siteConfig.contact.whatsapp && (
                    (() => {
                      const digits = siteConfig.contact.whatsapp.replace(/[^0-9]/g,'')
                      const msg = `Hello, I would like to sponsor/donate for ${siteConfig.eventName}. Please guide me about available items and next steps.`
                      const href = `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
                      return ( 
                        <a href={href} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-saffron text-white rounded-md shadow">Contact via WhatsApp</a>
                      )
                    })()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DonateButton(){
  const upiId = siteConfig.donation.upiId
  const handleDonateClick = () => {
    const pa = upiId
    const pn = siteConfig.associationName
    const tn = `Donation for ${siteConfig.eventName}`
    const upiParams = `pa=${encodeURIComponent(pa || '')}&pn=${encodeURIComponent(pn)}&tn=${encodeURIComponent(tn)}&cu=INR`
    const upiLink = `upi://pay?${upiParams}`

    // Android Chrome supports intent:// which can specify PhonePe package
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isChrome = /Chrome/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream

    if(pa && !pa.includes('[')){
      if(isAndroid && isChrome){
        const intentUrl = `intent://pay?${upiParams}#Intent;package=com.phonepe.app;scheme=upi;end`

        // Attempt PhonePe intent first. If it fails, try generic UPI after timeout.
        window.location.href = intentUrl

        // Fallback to generic UPI link after short delay (if intent not handled)
        setTimeout(()=>{
          window.location.href = upiLink
        }, 1200)
      } else {
        // Non-Android: attempt generic UPI link and fallback to QR image after timeout
        try{
          window.location.href = upiLink
          // If the UPI scheme isn't handled (common on iOS), open the QR image after a delay
          setTimeout(()=>{
            if(siteConfig.donation.qrImage) window.open(siteConfig.donation.qrImage, '_blank')
          }, 1200)
        }catch(e){
          if(siteConfig.donation.qrImage) window.open(siteConfig.donation.qrImage, '_blank')
        }
      }
    }else{
      // No valid UPI id configured; open QR image for scanning
      if(siteConfig.donation.qrImage) window.open(siteConfig.donation.qrImage, '_blank')
    }
  }

  return (
    <>
      <button type="button" onClick={handleDonateClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-maroon text-white font-semibold shadow">
        Donate
      </button>
      <div className="text-xs text-slate-500 mt-2">Opens PhonePe/UPI app on mobile (fallback: opens QR image for scanning)</div>
    </>
  )
}
