import React from 'react'
import { siteConfig } from '../data/siteConfig'

const vishnuiImg = new URL('../assets/vishnu.jpeg', import.meta.url).href

export default function Footer(){
  return (
    <footer className="mt-8 py-3 rounded-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-white rounded-lg overflow-hidden" style={{background:'linear-gradient(90deg,var(--maroon),var(--saffron))', margin: '0 -1.5rem'}}>
          <div className="py-3 px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-left">
                <div className="text-sm">© {new Date().getFullYear()} {siteConfig.associationName}</div>
                <div className="text-sm mt-1">Developed By: <span className="font-semibold text-amber-200">Vishnu Choutapelly</span></div>
                <div className="text-sm mt-1">Contact: <a className="underline" href="tel:+919014249898">+91-9014249898</a></div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-white/10 p-1 shadow-inner">
                  <img src={vishnuiImg} alt="Vishnu" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
