import React from 'react'

// Resolve local images for each highlight card (fall back to empty if not present)
let sthapanaImg = ''
let poojaImg = ''
let culturalImg = ''
let communityImg = ''
let annadanamImg = ''
let NimarjanamImg = ''
try{ sthapanaImg = new URL('../assets/sthapana.jpg', import.meta.url).href }catch{}
try{ poojaImg = new URL('../assets/pooja.jpeg', import.meta.url).href }catch{}
try{ culturalImg = new URL('../assets/culturalevent.webp', import.meta.url).href }catch{}
try{ communityImg = new URL('../assets/community.png', import.meta.url).href }catch{}
try{ annadanamImg = new URL('../assets/annadanam.png', import.meta.url).href }catch{}
try{ NimarjanamImg = new URL('../assets/nimarjan.png', import.meta.url).href }catch{}

const items = [
  {title:'Ganesh Sthapana', image: sthapanaImg || ''},
  {title:'Daily Pooja', image: poojaImg || ''},
  {title:'Cultural Programs', image: culturalImg || ''},
  {title:'Community Gathering', image: communityImg || ''},
  {title:'Annadanam', image: annadanamImg || ''},
  {title:'Nimarjanam', image: NimarjanamImg || ''}
]

export default function Highlights(){
  return (
    <section id="events" className="mt-8">
      <h3 className="text-2xl font-semibold text-maroon">Celebration Highlights</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(i=> (
          <div
            key={i.title}
            className={`relative overflow-hidden rounded shadow hover:-translate-y-1 transition-transform bg-white`}
          >
            {i.image && (
              <>
                <img src={i.image} alt={i.title} className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.36), rgba(0,0,0,0.10))' }}
                  aria-hidden
                />
              </>
            )}

            <div
              className={`relative p-6 md:p-8 min-h-[160px] md:min-h-[320px] ${i.image ? 'text-white' : 'text-slate-800 bg-white'} z-20`}
              style={i.image ? { textShadow: '0 1px 2px rgba(0,0,0,0.55)' } : undefined}
            >
              <div className="text-3xl">{i.icon}</div>
              <div className="font-semibold mt-2">{i.title}</div>
              <div className="text-sm mt-1" style={i.image ? {color:'rgba(255,255,255,0.92)'} : undefined}>{i.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
