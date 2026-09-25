const QrCode = require('qrcode-reader');
const path = require('path');

const imgPath = process.argv[2] || path.join(__dirname, '..', 'src', 'assets', 'payment.png');

(async () => {
  try{
    const JimpModule = await import('jimp');
    const Jimp = JimpModule.default || JimpModule;
    const image = await Jimp.read(imgPath)

    const qr = new QrCode();
    qr.callback = function(err, value) {
      if (err) {
        console.error('QR decode error:', err);
        process.exit(2);
      }
      console.log('QR decoded text:');
      console.log(value && value.result ? value.result : value);
    };
    qr.decode(image.bitmap);
  }catch(err){
    console.error('Failed to decode QR:', err);
    process.exit(1);
  }
})();
