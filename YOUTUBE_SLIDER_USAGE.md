# YouTube Iframe Slider - Usage Guide

## Overview

A standalone vertical video slider component for displaying YouTube iframe embeds. Perfect for portfolio showcases with TikTok-style vertical scrolling.

## Installation

Already included in the project! No additional dependencies needed (uses existing Swiper library).

## Quick Start

```tsx
import YouTubeIframeSlider from '@/components/youtube/youtube-iframe-slider';
import { youtubeVideos } from '@/data/youtube-videos';

export default function MyPage() {
  return (
    <div>
      <h1>Atleta Portfolio Videos</h1>
      <YouTubeIframeSlider iframeEmbeds={youtubeVideos.atleta.portfolio} />
    </div>
  );
}
```

## Available Videos

### Atleta
- **Portfolio**: 4 videos - `youtubeVideos.atleta.portfolio`
- **Study Case**: 1 video - `youtubeVideos.atleta.studyCase`

### Sommerhagene
- **Portfolio**: 1 video - `youtubeVideos.sommerhagen.portfolio`

### Zamzam
- **Portfolio**: 1 video - `youtubeVideos.zamzam.portfolio`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iframeEmbeds` | `string[]` | **required** | Array of YouTube iframe HTML strings |
| `height` | `string` | `"70vh"` | Height of the slider container |

## Examples

### Basic Usage

```tsx
import YouTubeIframeSlider from '@/components/youtube/youtube-iframe-slider';
import { youtubeVideos } from '@/data/youtube-videos';

<YouTubeIframeSlider iframeEmbeds={youtubeVideos.atleta.portfolio} />
```

### Custom Height

```tsx
<YouTubeIframeSlider
  iframeEmbeds={youtubeVideos.sommerhagen.portfolio}
  height="80vh"
/>
```

### Multiple Sliders on Same Page

```tsx
<div className="container">
  <section>
    <h2>Atleta Videos</h2>
    <YouTubeIframeSlider iframeEmbeds={youtubeVideos.atleta.portfolio} />
  </section>

  <section>
    <h2>Sommerhagene Videos</h2>
    <YouTubeIframeSlider iframeEmbeds={youtubeVideos.sommerhagen.portfolio} />
  </section>
</div>
```

### With Custom Styling

```tsx
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
  <YouTubeIframeSlider
    iframeEmbeds={youtubeVideos.atleta.portfolio}
    height="75vh"
  />
</div>
```

## Features

✅ **Vertical Scrolling** - TikTok-style vertical slider
✅ **Navigation Arrows** - Up/Down buttons for navigation
✅ **Slide Counter** - Shows current video (e.g., "1 / 4")
✅ **Mousewheel Support** - Scroll with mouse wheel
✅ **Touch Gestures** - Swipe on mobile devices
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Smooth Animations** - 800ms transition speed
✅ **Loop Mode** - Automatically loops when reaching end
✅ **Scroll Hint** - Shows hint on first slide

## Integration Examples

### In Portfolio Detail Page

```tsx
// src/app/[locale]/portfolio/atleta/page.tsx
"use client";
import YouTubeIframeSlider from '@/components/youtube/youtube-iframe-slider';
import { youtubeVideos } from '@/data/youtube-videos';

export default function AtletaPage() {
  return (
    <main>
      <section className="portfolio-videos">
        <div className="container">
          <YouTubeIframeSlider iframeEmbeds={youtubeVideos.atleta.portfolio} />
        </div>
      </section>
    </main>
  );
}
```

### In Study Cases Page

```tsx
// src/app/[locale]/study-cases/atleta/page.tsx
"use client";
import YouTubeIframeSlider from '@/components/youtube/youtube-iframe-slider';
import { youtubeVideos } from '@/data/youtube-videos';

export default function AtletaStudyCasePage() {
  return (
    <main>
      <section className="results-section">
        <h2>Results Video</h2>
        <YouTubeIframeSlider iframeEmbeds={youtubeVideos.atleta.studyCase} />
      </section>
    </main>
  );
}
```

## Adding New Videos

To add new YouTube videos, edit `/src/data/youtube-videos.ts`:

```typescript
export const youtubeVideos = {
  // ... existing projects

  newProject: {
    portfolio: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>',
    ],
  },
};
```

## Customization

### Custom Navigation Buttons

The navigation buttons can be styled via CSS:

```scss
.youtube-nav-btn {
  // Your custom styles
}
```

### Custom Counter Style

```scss
.youtube-slide-counter {
  // Your custom styles
}
```

### Hide Navigation on Single Video

Navigation arrows and counter automatically hide when there's only 1 video.

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Iframes are lazy-loaded by YouTube
- Only active slide is rendered at a time
- Smooth 800ms transitions
- No YouTube API calls needed

## Troubleshooting

### Videos not showing?

- Check that iframe embed codes are valid
- Ensure videos are not private/restricted
- Verify component is imported correctly

### Slider not scrolling?

- Make sure Swiper CSS is imported
- Check that parent container has defined height
- Verify `iframeEmbeds` array has content

### Mobile issues?

- Component is fully responsive
- Touch gestures work out of the box
- Test on actual devices for best results

## Files Structure

```
fulkrums-clean/
├── src/
│   ├── components/
│   │   └── youtube/
│   │       └── youtube-iframe-slider.tsx    # Main component
│   ├── data/
│   │   └── youtube-videos.ts                # Video data
│   └── app/
│       └── globals.scss                     # Styles
└── YOUTUBE_SLIDER_USAGE.md                  # This file
```

## Credits

- Built with Swiper.js
- Uses YouTube iframe embeds
- Designed for Fulkrums portfolio projects
