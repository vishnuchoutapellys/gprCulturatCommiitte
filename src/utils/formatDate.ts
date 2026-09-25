export function formatDate(input?: Date | string | number){
  const d = input ? new Date(input) : new Date()
  if(Number.isNaN(d.getTime())) return ''
  const dd = String(d.getDate()).padStart(2,'0')
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const yyyy = String(d.getFullYear())
  return `${dd}/${mm}/${yyyy}`
}
