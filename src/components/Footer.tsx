import React from 'react'
import { siteConfig } from '../data/siteConfig'

// const vishnuiImg = new URL('../assets/vishnu.jpeg', import.meta.url).href
import dineshImg from '../assets/committee/dinesh.png'


export default function Footer(){
  return (
    <footer className="mt-8 py-3 rounded-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-white rounded-lg overflow-hidden" style={{ background: 'linear-gradient(90deg, #54b457de, var(--saffron), var(--gold))', color: 'white' }}>
          <div className="py-3 px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-left">
                <div className="text-sm">© {new Date().getFullYear()} {siteConfig.associationName}</div>
                <div className="text-sm mt-1">Developed By: <span className="font-semibold text-amber-200">Dinesh Varma</span></div>
                <div className="text-sm mt-1">Contact: <a className="underline" href="tel:+919959681416">+91-9959681416</a></div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-white/10 p-1 shadow-inner">
                  <img src={dineshImg} alt="Dinesh Varma" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
