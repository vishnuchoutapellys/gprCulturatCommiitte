import React from 'react'
import { siteConfig, siteAssets, eventDetails } from '../data/siteConfig'
import PetalAnimation from './PetalAnimation'

export default function Hero(){
  return (
    <section id="home" className="relative pt-28 pb-12 overflow-hidden hero-bg">
      {/* subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" aria-hidden="true" />

      {/* falling petals canvas (behind content) */}
      <PetalAnimation />

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10 hero-animate hero-content">
        <div className="w-full hero-left">
          <div className="hero-title text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight drop-shadow">{siteConfig.eventName}</h1>
          </div>

          <div className="hero-meta text-amber-100">
            <p className="mt-4 text-xl drop-shadow">Celebrating Faith, Unity & Community — {siteConfig.associationName}</p>
            <p className="mt-2 text-sm">Sthapana: {siteConfig.sthapanaDate} · Celebration: {siteConfig.eventRange.start} – {siteConfig.eventRange.end}</p>
            <div className="mt-6 flex gap-3">
              <a href="#details" className="px-6 py-3 devotional-accent rounded shadow-lg">View Celebration Details</a>
              <a href="#rsvp" className="px-5 py-3 border border-amber-300 text-amber-100 rounded">Join Us</a>
            </div>
            <div className="mt-6 text-sm">{siteConfig.venue.address}</div>
          </div>
        </div>
        {/* <div className="flex justify-center">
          <div className="w-80 h-80 rounded-full shadow-lg overflow-hidden bg-white/20 backdrop-blur-sm">
            <img src={siteAssets.heroImage} alt={siteAssets.heroImage ? 'Hero photo' : 'Ganesha illustration'} className="w-full h-full object-cover"/>
          </div>
        </div> */}
      </div>
    </section>
  )
}
