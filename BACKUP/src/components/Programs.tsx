import React from 'react'

const programs=[
  {title:'Classical Dance',desc:'Bharatanatyam and other forms'},
  {title:'Folk Dance',desc:'Traditional folk performances'},
  {title:'Music',desc:'Carnatic & devotional music'},
  {title:'Bhajans',desc:'Community bhajans and bhajans sessions'},
  {title:'Kids Performances',desc:'Children shows and competitions'},
  {title:'Hanuman Chalisa',desc:'Devotional prayer and recitation'}

]

export default function Programs(){
  return (
    <section id="programs" className="mt-8">
      <h3 className="text-2xl font-semibold">Cultural Programs</h3>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {programs.map(p=> (
          <div key={p.title} className="bg-gray-50 p-4 rounded shadow-sm border border-black/10 hover:shadow-md transition-shadow">
            <div className="font-semibold text-slate-800">{p.title}</div>
            <div className="text-sm text-slate-600">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
