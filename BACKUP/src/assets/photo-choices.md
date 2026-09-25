Photo Choices (temporary real-photo placeholders)

This project uses Unsplash Source queries to display royalty-free example photos while you prepare final assets.

Notes:
- The URLs below use the Unsplash Source API which returns a suitable photo for the given query.
- For production, download the chosen images, optimize them, and place them in `src/assets/` then update `src/data/siteConfig.ts` to point to the local files.

Hero
- Query used: https://source.unsplash.com/1000x800/?ganesha,temple,festival

Committee portraits (example)
- Query template: https://source.unsplash.com/400x400/?portrait,person,face&sig=1
- Change `sig` to pick another random image for variety.

Gallery
- Queries used:
  - https://source.unsplash.com/800x600/?pooja,prayers
  - https://source.unsplash.com/800x600/?festival,crowd
  - https://source.unsplash.com/800x600/?traditional,dance
  - https://source.unsplash.com/800x600/?music,performance
  - https://source.unsplash.com/800x600/?community,event
  - https://source.unsplash.com/800x600/?offering,annadanam
  - https://source.unsplash.com/800x600/?procession,immersion
  - https://source.unsplash.com/800x600/?kids,performance

How to replace with local files
1. Download chosen images from Unsplash/Pexels (or your own photos).
2. Optimize images and save them to `src/assets/` (e.g., `src/assets/gallery/img1.jpg`).
3. Update `siteAssets.galleryPlaceholders` in `src/data/siteConfig.ts` to the local paths, or update `photoChoices` to point to local files.
4. Commit assets and rebuild.

Licensing
- Unsplash images are free to use, but check Unsplash license and attribution policies if required.
