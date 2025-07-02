# Justas Neue - Website

A modern React website for DJ/Producer Justas featuring video galleries, music streaming, and interactive components.

## Video Assets

### Placement
All video files should be placed in the `public/videos/` directory to ensure proper loading by the VideoSection and VideoPlayer components.

### File Structure
```
public/
└── videos/
    ├── justas1.mp4
    ├── justas2.mp4
    ├── justas3.mp4
    ├── event-highlight.mp4
    ├── performance1.mp4
    └── studio-session.mp4
```

### Important Notes
- **File Names Must Match**: The video file names in the `public/videos/` directory must exactly match the `src` paths defined in `VideoSection.tsx`
- **Case Sensitivity**: File names are case-sensitive on most servers
- **Supported Formats**: Use MP4 format for best browser compatibility
- **File Size**: Optimize video files for web delivery to ensure fast loading times

### Adding New Videos
1. Place video file in `public/videos/`
2. Update the `videos` array in `src/components/VideoSection.tsx`
3. Ensure the `src` path matches the actual file name (e.g., `/videos/your-video.mp4`)
4. Add corresponding poster image in `public/Images/` if desired

### Troubleshooting Video Loading
- Verify file exists in `public/videos/`
- Check file name spelling and case
- Ensure video format is web-compatible (MP4 recommended)
- Check browser console for specific error messages

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
