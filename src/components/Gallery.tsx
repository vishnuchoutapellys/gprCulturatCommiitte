import React, { useState } from 'react'
import { siteAssets } from '../data/siteConfig'

export default function Gallery(){
  const images = siteAssets.galleryPlaceholders
  const [open,setOpen]=useState<number|null>(null)
  return (
    <section id="gallery" className="mt-8">
      <h3 className="text-2xl font-semibold">Gallery</h3>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img,idx)=> (
          <button key={img.src} onClick={()=>setOpen(idx)} className="overflow-hidden rounded">
            <img src={img.src} alt={img.alt} className="w-full h-40 object-cover hover:scale-105 transition"/>
          </button>
        ))}
      </div>

      {open!==null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4" onClick={()=>setOpen(null)}>
          <div className="bg-white rounded max-w-3xl w-full p-4" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-slate-600">Image {open+1} — replaceable asset</div>
              <button onClick={()=>setOpen(null)}>Close</button>
            </div>
            <img src={images[open].src} alt={images[open].alt} className="w-full h-auto"/>
          </div>
        </div>
      )}
    </section>
  )
}
