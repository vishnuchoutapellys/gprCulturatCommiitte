import React from 'react'

const programs=[
  {title:'Folk Dance',desc:'Traditional folk performances'},
  {title:'Music',desc:'Carnatic & devotional music'},
  {title:'Annadanam',desc:'Community feast and offerings to Lord Ganesh'},
  {title:'Musical chair',desc:'Fun musical chair game for participants'},
  {title:'stalls',desc:'Various stalls for food, games, and merchandise'},
  {title:'Laddu Lucky Dip',desc:'Participants can try their luck to win laddus'},
  {title:'Magical Show',desc:'A magical performance to entertain the audience'},
  {title:'Ganapathi Homam',desc:'A special ritual performed for Lord Ganesh'},
  {title:'Saraswati Pooja',desc:'A special ritual dedicated to Goddess Saraswati'}

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
