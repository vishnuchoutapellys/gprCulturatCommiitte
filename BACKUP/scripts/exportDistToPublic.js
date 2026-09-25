const fs = require('fs')
const path = require('path')

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true })
  const entries = await fs.promises.readdir(src, { withFileTypes: true })
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.promises.copyFile(srcPath, destPath)
    }
  }
}

;(async ()=>{
  try{
    const root = process.cwd()
    const dist = path.join(root, 'dist')
    const dest = path.join(root, 'public_site')
    const stat = await fs.promises.stat(dist).catch(()=>null)
    if(!stat){
      console.error('dist not found')
      process.exit(1)
    }
    await copyDir(dist, dest)
    console.log('exported dist to public_site')
  }catch(err){
    console.error(err)
    process.exit(1)
  }
})()
