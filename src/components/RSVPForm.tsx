import React, { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../data/siteConfig'
import { formatDate } from '../utils/formatDate'

export default function RSVPForm(){
  const [open, setOpen] = useState(false)
  const [loading,setLoading]=useState(false)
  const [success,setSuccess]=useState<null|boolean>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [form,setForm]=useState({name:'',apartment:'',phone:'',email:'',count:1,interest:'General Participation',slot:'',message:''})
  const nameRef = useRef<HTMLInputElement | null>(null)
  const [showPwdModal, setShowPwdModal] = useState(false)
  const [downloadPwd, setDownloadPwd] = useState('')
  const [pwdError, setPwdError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const LOCAL_DOWNLOAD_PASSWORD = 'LGP@2026'

  // Resolve API base robustly for both submit and download handlers
  const resolveApiBase = ()=>{
    const configuredBase = siteConfig.apiConfig?.apiBase || '/api'
    let apiBase = configuredBase
    try{
      if(typeof window !== 'undefined' && window.location){
        const isLocalDevServer = window.location.hostname === 'localhost' && (window.location.port === '5173' || window.location.port === '5174')
        if((configuredBase === '/api' || configuredBase === '') && isLocalDevServer){
          apiBase = 'http://localhost:3001/api'
        }
      }
    }catch(e){ }
    return { configuredBase, apiBase }
  }

  // Simple input helpers/validators
  const sanitizeAlphaSpace = (s:string)=> String(s||'').replace(/[^A-Za-z\s]/g,'')
  const onlyDigits = (s:string)=> String(s||'').replace(/\D/g,'')

  // Local storage helpers (fallback for serverless/simple deployment)
  const LS_KEY = 'participants_local'
  const appendToLocal = (row:{dateTime:string,name:string,apartment:string,phone:string,email:string,count:number,interest:string,slot?:string,message:string})=>{
    try{
      const raw = localStorage.getItem(LS_KEY)
      const arr = raw ? JSON.parse(raw) : []
      arr.push(row)
      localStorage.setItem(LS_KEY, JSON.stringify(arr))
      return true
    }catch(e){ console.error('local append failed', e); return false }
  }
  const readLocal = ()=>{
    try{ const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : [] }catch(e){ return [] }
  }
  const downloadLocalAsCSV = ()=>{
    const rows = readLocal()
    if(!rows || rows.length===0) return false
    const headers = ['Date & Time','Name','Apartment / House No','Phone','Email','Number of Participants','Participation Type','Slot','Message']
    const lines = [headers.join(',')]
    for(const r of rows){
      const esc = (v:any)=>`"${String(v||'').replace(/"/g,'""')}"`
      lines.push([esc(r.dateTime),esc(r.name),esc(r.apartment),esc(r.phone),esc(r.email),esc(r.count),esc(r.interest),esc((r as any).slot||''),esc(r.message)].join(','))
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'participants_local.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    return true
  }

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    // basic validation (frontend)
    setErrorMessage(null)
    const name = String(form.name || '').trim()
    const phone = String(form.phone || '').trim()
    const interest = String(form.interest || '').trim()
    const slotVal = String(form.slot || '').trim()
    const missing = [] as string[]
    if(!name) missing.push('Name')
    else if(!/^[A-Za-z\s]+$/.test(name)) missing.push('Name (letters only)')
    const digits = phone.replace(/\D/g,'')
    if(!phone) missing.push('Phone')
    else if(!/^\d{10}$/.test(digits)) missing.push('Phone (10 digits)')
    if(!interest) missing.push('Participation Type')
    if(interest === 'Pooja' && !slotVal) missing.push('Slot')
    if(String(form.message || '').length > 120) missing.push('Message (max 120 chars)')
    if(missing.length){
      setErrorMessage(`Please correct: ${missing.join(', ')}`)
      setSuccess(false)
      return
    }
    setLoading(true)
    try{
      const payload = {
        name: String(form.name).trim(),
        apartment: String(form.apartment || '').trim(),
        phone: String(form.phone).trim(),
        email: String(form.email || '').trim(),
        count: Number(form.count) || 1,
        interest: String(form.interest).trim(),
        slot: String(form.slot || '').trim(),
        message: String(form.message || '').trim()
      }

      const { configuredBase, apiBase } = resolveApiBase()
      console.debug('RSVP submit payload', payload)
      console.debug('RSVP configured apiBase=', configuredBase, '=> using', apiBase)
      const resp = await fetch(`${apiBase}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      let data = {}
      try{ data = await resp.json() }catch(e){ console.debug('no JSON response') }
      if(resp.ok && (data as any).success){
        setSuccess(true)
        setErrorMessage(null)
        // clear form only after confirmed saved
        setForm({name:'',apartment:'',phone:'',email:'',count:1,interest:'General Participation',slot:'',message:''})
        setOpen(false)
      } else {
        // Server returned error; try fallback to localStorage
        const serverMsg = (data && (data as any).error) ? (data as any).error : `Server returned ${resp.status}`
        console.debug('Server error, falling back to localStorage', serverMsg)
        const now = formatDate()
        const appended = appendToLocal({ dateTime: now, name: payload.name, apartment: payload.apartment, phone: payload.phone, email: payload.email, count: payload.count, interest: payload.interest, slot: payload.slot, message: payload.message })
        if(appended){
          setSuccess(true)
          // setErrorMessage('Saved locally (offline fallback).')
          setForm({name:'',apartment:'',phone:'',email:'',count:1,interest:'General Participation',slot:'',message:''})
          setOpen(false)
        } else {
          setErrorMessage(String(serverMsg))
          setSuccess(false)
        }
      }
    }catch(err){
      console.error('RSVP submit error', err)
      // network error or server unreachable
      // fallback to localStorage if network error
      console.debug('Network error, saving locally')
      const now = formatDate()
      const appended = appendToLocal({ dateTime: now, name: payload.name, apartment: payload.apartment, phone: payload.phone, email: payload.email, count: payload.count, interest: payload.interest, slot: payload.slot, message: payload.message })
      if(appended){
        setSuccess(true)
        // setErrorMessage('Saved locally (offline fallback).')
        setForm({name:'',apartment:'',phone:'',email:'',count:1,interest:'General Participation',slot:'',message:''})
        setOpen(false)
      } else {
        setErrorMessage('Unable to reach the server and local save failed.')
        setSuccess(false)
      }
    }finally{
      setLoading(false)
    }
  }

  // Listen for external open requests (e.g., Volunteer button)
  useEffect(()=>{
    const openHandler = ()=>{
      setOpen(true)
      // focus after open animation
      setTimeout(()=>{ try{ nameRef.current && nameRef.current.focus() }catch{} }, 350)
    }
    window.addEventListener('rsvp-open', openHandler as EventListener)
    // do NOT auto-open on page load even if hash is present — open only on explicit user action
    return ()=> window.removeEventListener('rsvp-open', openHandler as EventListener)
  }, [])

  return (
    <section id="rsvp" className="mt-8">
      <div className="mt-4">
        <button
          className="w-full text-left flex items-center justify-between p-4 devotional-gradient text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          aria-expanded={open}
          aria-controls="rsvp-panel"
          aria-label="Toggle RSVP form"
          onClick={()=>setOpen(v=>!v)}
        >
          <div className="text-left">
            <div className="font-semibold">Participation</div>
            <div className="text-sm text-amber-100">Click to open the RSVP form and participation options</div>
          </div>
          <svg className={`w-5 h-5 text-white transition-transform ${open? 'rotate-180':'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div id="rsvp-panel" className={`mt-3 overflow-hidden transition-all duration-300 ${open? 'max-h-[2000px] opacity-100':'max-h-0 opacity-0'}`} style={{transitionProperty:'max-height, opacity'}}>
          <div className="bg-white p-4 rounded-md shadow-inner border">
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input ref={nameRef} aria-label="Name" placeholder="Name*" value={form.name} onChange={e=>setForm({...form,name: sanitizeAlphaSpace(e.target.value)})} className="p-2 border rounded" />
              <input aria-label="Apartment" placeholder="Apartment / House No" value={form.apartment} onChange={e=>setForm({...form,apartment:e.target.value})} className="p-2 border rounded" />
              <input aria-label="Phone" placeholder="Phone*" type="tel" inputMode="numeric" pattern="\d{10}" maxLength={10} value={form.phone} onChange={e=>setForm({...form,phone: onlyDigits(e.target.value).slice(0,10)})} className="p-2 border rounded" />
              <input aria-label="Email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-2 border rounded" />
              <input aria-label="Participants" type="number" min={1} placeholder="No. of Participants" value={form.count} onChange={e=>setForm({...form,count:Math.max(1,Number(e.target.value))})} className="p-2 border rounded" />
              <select aria-label="Interested In" value={form.interest} onChange={e=>setForm(prev=>({...prev,interest:e.target.value, slot: e.target.value === 'Pooja' ? prev.slot : ''}))} className="p-2 border rounded">
                <option>General Participation</option>
                <option>Volunteer</option>
                <option>Sponsorship</option>
                <option>Annadanam</option>
                <option>Games</option>
                 <option>Pooja</option>
                <option>Any Other(Dance,Singing,etc.)</option>
              </select>
              {form.interest === 'Pooja' && (
                <select aria-label="Pooja Slot" value={form.slot} onChange={e=>setForm({...form,slot:e.target.value})} className="p-2 border rounded">
                  <option value="">Select Slot</option>
                  <option>Morning Slot</option>
                  <option>Evening Slot</option>
                </select>
              )}
              <textarea aria-label="Message" placeholder="Message" value={form.message} onChange={e=>setForm({...form,message: e.target.value.slice(0,120)})} className="p-2 md:col-span-2 border rounded" maxLength={120} />
              <div className="text-sm text-slate-500 md:col-span-2">{String(form.message || '').length}/120</div>
              <div className="md:col-span-2">
                <div className="flex flex-row flex-wrap items-center gap-3">
                  <button type="submit" className="px-4 py-2 bg-saffron text-white rounded shadow" disabled={loading}>{loading? 'Sending...':'Submit'}</button>
                  <button type="button" onClick={()=>{ setShowPwdModal(true); setDownloadPwd(''); setPwdError(null) }} className="px-4 py-2 bg-white border border-saffron text-saffron rounded shadow hover:bg-saffron hover:text-white transition">Download Excel</button>
                </div>
                {showPwdModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={()=>setShowPwdModal(false)} />
                    <div className="relative bg-white rounded p-6 w-[90%] max-w-md shadow-lg">
                      <h3 className="font-semibold text-lg mb-3">Only Authorised persons can download</h3>
                      <p className="text-sm text-slate-600 mb-3">Enter password to download participants.xlsx</p>
                      <input type="password" autoFocus value={downloadPwd} onChange={e=>setDownloadPwd(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Password" />
                      {pwdError && <div className="text-red-600 mb-2">{pwdError}</div>}
                      <div className="flex justify-end space-x-2">
                        <button type="button" onClick={()=>{ setShowPwdModal(false); setDownloadPwd(''); setPwdError(null) }} className="px-3 py-2 border rounded">Cancel</button>
                        <button type="button" disabled={downloading} onClick={async ()=>{
                          try{
                            setPwdError(null)
                            setDownloading(true)
                            // validate locally first
                            if(downloadPwd !== LOCAL_DOWNLOAD_PASSWORD){
                              setPwdError('Incorrect password')
                              setDownloading(false)
                              return
                            }
                            const { configuredBase, apiBase } = resolveApiBase()
                            console.debug('Local password validated; requesting file from', apiBase)
                            const resp = await fetch(`${apiBase}/participants/download`)
                            if(resp.status===404){
                              // server has no file; fallback to local storage CSV
                              const ok = downloadLocalAsCSV()
                              if(!ok) alert('No participants file found yet.')
                              setDownloading(false)
                              setShowPwdModal(false)
                              setDownloadPwd('')
                              return
                            }
                            if(!resp.ok){
                              let msg = 'Download failed'
                              try{ const j = await resp.json(); if(j && j.error) msg = String(j.error) }catch{}
                              alert(msg)
                              setDownloading(false)
                              return
                            }
                            const blob = await resp.blob()
                            const url = window.URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = 'participants.xlsx'
                            document.body.appendChild(a)
                            a.click()
                            a.remove()
                            window.URL.revokeObjectURL(url)
                            setDownloading(false)
                            setShowPwdModal(false)
                            setDownloadPwd('')
                            setPwdError(null)
                          }catch(e){
                            console.error('download error', e)
                            alert('Download failed')
                            setDownloading(false)
                          }
                        }} className="px-3 py-2 bg-saffron text-white rounded" >{downloading? 'Downloading...':'Download'}</button>
                      </div>
                    </div>
                  </div>
                )}
                {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}
                {success===true && <div className="mt-2 text-green-700">Thank you — your participation has been recorded.</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
