const express = require('express')
const path = require('path')
const fs = require('fs')
const ExcelJS = require('exceljs')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Simple request logger for debugging
app.use((req, res, next)=>{
  console.log(`[server] ${req.method} ${req.originalUrl}`)
  next()
})

const ASSETS_DIR = path.join(process.cwd(), 'assets')
const FILE_PATH = path.join(ASSETS_DIR, 'participants.xlsx')
const SHEET_NAME = 'Participants'

function ensureAssetsDir(){
  if(!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true })
}

app.post('/api/participants', async (req, res) => {
  try{
    const { name, apartment, phone, email, count, interest, message } = req.body || {}
    if(!name || !phone || !interest) return res.status(400).json({ success: false, error: 'Missing required fields' })

    ensureAssetsDir()

    const workbook = new ExcelJS.Workbook()
    let worksheet
    if(fs.existsSync(FILE_PATH)){
      await workbook.xlsx.readFile(FILE_PATH)
      worksheet = workbook.getWorksheet(SHEET_NAME)
      if(!worksheet){
        worksheet = workbook.addWorksheet(SHEET_NAME)
        worksheet.addRow(['Date & Time','Name','Apartment / House No','Phone','Email','Number of Participants','Participation Type','Message'])
      }
    } else {
      worksheet = workbook.addWorksheet(SHEET_NAME)
      worksheet.addRow(['Date & Time','Name','Apartment / House No','Phone','Email','Number of Participants','Participation Type','Message'])
    }

    const now = new Date()
    const dateTime = now.toISOString()
    worksheet.addRow([dateTime, String(name).trim(), apartment ? String(apartment).trim() : '', String(phone).trim(), email ? String(email).trim() : '', Number(count) || 1, String(interest).trim(), message ? String(message).trim() : ''])

    await workbook.xlsx.writeFile(FILE_PATH)

    return res.json({ success: true })
  }catch(err){
    console.error('Error saving participant', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

app.get('/api/participants/download', (req, res) => {
  try{
    if(!fs.existsSync(FILE_PATH)) return res.status(404).json({ success: false, error: 'No participants file found' })
    return res.download(FILE_PATH, 'participants.xlsx')
  }catch(err){
    console.error('Download error', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// POST download with simple password check
app.post('/api/participants/download', (req, res) => {
  try{
    const { password } = req.body || {}
    // simple shared-secret check (change to env var in production)
    if(password !== 'LGP@2026'){
      return res.status(401).json({ success: false, error: 'your not authorised person to download' })
    }
    if(!fs.existsSync(FILE_PATH)) return res.status(404).json({ success: false, error: 'No participants file found' })
    return res.download(FILE_PATH, 'participants.xlsx')
  }catch(err){
    console.error('Download error', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log('Participants server listening on port', port))
