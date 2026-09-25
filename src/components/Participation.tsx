import React from 'react'

export default function Participation(){
  const handleVolunteer = ()=>{
    // scroll to RSVP section and request it to open + focus
    try{ window.location.hash = '#rsvp' }catch{}
    // dispatch a custom event the RSVP form listens to
    try{ window.dispatchEvent(new CustomEvent('rsvp-open')) }catch{}
  }

  return (
    <section id="participation" className="mt-8">
      <h3 className="text-2xl font-semibold">Together We Celebrate</h3>
      <p className="mt-2 text-slate-700">Volunteer, sponsor, or register for a cultural program. Your participation makes the festival special.</p>
      <div className="mt-4 flex gap-3 flex-wrap">
        <button onClick={handleVolunteer} className="px-4 py-2 bg-saffron text-white rounded">Volunteer</button>
      </div>
    </section>
  )
}
