import React from 'react'

// Resolve local placeholder image for the circular icons

let circleImg = ''
try{
  circleImg = new URL('../assets/sthapana.jpg', import.meta.url).href
}catch{}

let poojaImg = ''
try{
  poojaImg = new URL('../assets/pooja.jpeg', import.meta.url).href
}catch{}

let culturalevent = ''
try{
  culturalevent = new URL('../assets/culturalevent.webp', import.meta.url).href
}catch{}

let nimarjan = ''
try{
  nimarjan = new URL('../assets/nimarjan.png', import.meta.url).href
}catch{}

let agamanImg = ''
try{
  agamanImg = new URL('../assets/agaman.jpg', import.meta.url).href
}catch{}

let annadanamImg = ''
try{
  annadanamImg = new URL('../assets/annadanam.png', import.meta.url).href
}catch{}

let saraswatiPoojaImg = ''
try{
  saraswatiPoojaImg = new URL('../assets/saraswathi.png', import.meta.url).href
}catch{}

let AstaGanapathiPoojaImg = ''
try{
  AstaGanapathiPoojaImg = new URL('../assets/astaganapathi.png', import.meta.url).href
}catch{}

let HomamImg = ''
try{
  HomamImg = new URL('../assets/homam.png', import.meta.url).href
}catch{}

let stallaImg = ''
try{
  stallaImg = new URL('../assets/stalls.png', import.meta.url).href
}catch{}

let karchanaImg = ''
try{
  karchanaImg = new URL('../assets/karchana.png', import.meta.url).href
}catch{}

const events = [
  {date:'14/09/2026',title:'Ganesh Sthapana',time:'Evening',desc:'Lord Ganesha’s Pranaprathista and Pooja ceremony', image: circleImg},
  {date:'15/09/2026 - 23/09/2026',title:'Daily Pooja',time:'Morning 8:00 AM & Evening 7:00 PM',desc:'Daily rituals and aarti', image: poojaImg},
  {date:'15/09/2026 - 23/09/2026',title:'Cultural Evening',time:'6:00 PM',desc:'Music and dance performances', image: culturalevent},
  {date:'17/09/2026',title:'Saraswati Pooja',time:'Evening 7:00 PM',desc:'Special ritual dedicated to Goddess Saraswati', image: saraswatiPoojaImg},
  {date:'18/09/2026',title:'Asta Ganapathi Pooja',time:'Evening 7:00 PM',desc:'Special ritual dedicated to the eight forms of Lord Ganapathi', image: AstaGanapathiPoojaImg},
  {date:'19/09/2026',title:'Ganapathi Homam',time:'Morning 7:00 AM',desc:'Special ritual dedicated to Lord Ganapathi', image: HomamImg},
  {date:'20/09/2026',title:'Grand Anna Prasadam',time:'Evening 7:00 PM',desc:'Community annadanam and cultural programs', image: annadanamImg},
  {date:'21/09/2026',title:'Stalls & Magical Show',time:'All Day',desc:'Various stalls and activities for participants', image: stallaImg},
  {date:'22/09/2026',title:'Kunkuma Archana',time:'Evening',desc:'Special ritual involving Kunkuma Archana', image: karchanaImg},
  {date:'23/09/2026',title:'Ganesh Nimarjanam',time:'Evening',desc:'Immersion procession', image: nimarjan}
]

export default function Schedule(){
  return (
    <section id="schedule" className="mt-8">
      <h3 className="text-2xl font-semibold text-maroon">Event Schedule</h3>
      <div className="mt-6 grid gap-6">
        {events.map((e,idx)=> (
          <div key={e.title} className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-inner">
                { (e.image || circleImg) ? (
                  <img src={e.image || circleImg} alt={e.title} className="w-full h-full object-cover object-left md:object-center" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{background:'linear-gradient(135deg,#FF7043,#E0A800)'}}>
                    <div className="text-sm text-center">{e.date.split(' ')[0]}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 bg-white rounded shadow p-4" style={{borderLeft:'6px solid #E0A800'}}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-3">
                    <div className="font-semibold text-saffron">{e.title}</div>
                    <div className="text-xs md:text-sm text-slate-600">{e.date}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-600">{e.time}</div>
              </div>
              <div className="text-sm text-slate-700 mt-2">{e.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
