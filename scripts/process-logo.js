const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const rawPath = path.join(__dirname, '..', 'public', 'logo-raw.png');
const darkPath = path.join(__dirname, '..', 'public', 'logo-dark.png');
const lightPath = path.join(__dirname, '..', 'public', 'logo-light.png');

console.log("Loading raw PNG from " + rawPath);

fs.createReadStream(rawPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;
    console.log(`Successfully parsed PNG: ${width}x${height}`);

    const darkPng = new PNG({ width: width, height: height });
    const lightPng = new PNG({ width: width, height: height });

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;

        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const originalAlpha = this.data[idx + 3];

        // Calculate brightness
        const brightness = (r + g + b) / 3;

        // Calculate alpha (transparent background for white, opaque for black/dark colors)
        let alpha = 0;
        if (brightness > 240) {
          alpha = 0; // Transparent background
        } else if (brightness < 40) {
          alpha = originalAlpha; // Keep original opacity
        } else {
          // Linear interpolation for smooth borders
          const calcAlpha = Math.round(255 * (1 - (brightness - 40) / 200));
          alpha = Math.min(originalAlpha, Math.max(0, Math.min(255, calcAlpha)));
        }

        // Dark Logo values (Ink: #0B1F33 -> RGB: 11, 31, 51)
        darkPng.data[idx] = 11;
        darkPng.data[idx + 1] = 31;
        darkPng.data[idx + 2] = 51;
        darkPng.data[idx + 3] = alpha;

        // Light Logo values (White: #FFFFFF -> RGB: 255, 255, 255)
        lightPng.data[idx] = 255;
        lightPng.data[idx + 1] = 255;
        lightPng.data[idx + 2] = 255;
        lightPng.data[idx + 3] = alpha;
      }
    }

    // Write Dark Logo
    darkPng.pack().pipe(fs.createWriteStream(darkPath)).on('finish', () => {
      console.log(`Saved transparent dark logo: ${darkPath}`);
    });

    // Write Light Logo
    lightPng.pack().pipe(fs.createWriteStream(lightPath)).on('finish', () => {
      console.log(`Saved transparent light logo: ${lightPath}`);
    });
  })
  .on('error', (err) => {
    console.error("Error processing logo: " + err.message);
  });
