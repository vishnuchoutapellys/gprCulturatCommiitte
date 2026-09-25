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
    const src = path.join(root, 'public_site')
    const dest = path.join(root, 'docs')
    const stat = await fs.promises.stat(src).catch(()=>null)
    if(!stat){
      console.error('public_site not found')
      process.exit(1)
    }
    await copyDir(src, dest)
    console.log('copied public_site to docs')
  }catch(err){
    console.error(err)
    process.exit(1)
  }
})()
