# Grok Assistant

A powerful userscript that automates retry handling and video upscaling for Grok's AI image generation platform. Built with React and TypeScript, this script intelligently monitors generation failures and automatically retries when content moderation occurs or generation anomalies are detected.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

### Core Functionality
- **Automatic Retry on Moderation**: Detects "Content Moderated" toasts and automatically retries with configurable cooldown
- **Enhanced Detection Mode**: Monitors for generation anomalies where progress completes without video output
- **Configurable Retry Limits**: Set maximum retry attempts (1-20) with persistent settings
- **Customizable Cooldown**: Adjust retry delay from 500ms to any duration
- **Auto-Start Monitoring**: Automatically arms the assistant when Grok begins generating
- **Auto-Upscale**: Automatically triggers video upscaling after successful generations

### Smart State Management
- **Finite State Machine**: Robust TypeScript-based state machine ensures predictable behavior
- **Visual Progress Bar**: Real-time cooldown progress with seconds remaining
- **Status Tracking**: Clear status messages and attempt counters
- **Quota Detection**: Automatically detects and handles image generation limits
- **Persistent Settings**: All preferences saved to browser storage

## 📋 Requirements

- **Browser**: Chrome, Firefox, Edge, or any browser supporting userscripts
- **Userscript Manager**: [Tampermonkey](https://www.tampermonkey.net/) (recommended) or [Greasemonkey](https://www.greasespot.net/)
- **Target Platform**: [Grok Imagine](https://grok.com/imagine/post/*)

## 🚀 Installation

### Option 1: Install from Github (Recommended)

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Click this [link](https://github.com/JerryLeam/grok-imagine-assistant/raw/refs/heads/main/dist/grok-assistant.user.js) to install! Just that simple!
3. Tampermonkey will prompt you to install the script
4. Navigate to any Grok Imagine page to see the assistant panel

### Option 2: Build from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/JerryLeam/grok-imagine-assistant.git
   cd grok-imagine-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the userscript**
   ```bash
   npm run build
   ```

4. **Install the script**
   - The built script will be in `dist/grok-assistant.user.js`
   - Open Tampermonkey dashboard
   - Click the "+" icon to create a new script
   - Copy the contents of the built file and paste into the editor
   - Save (Ctrl+S or Cmd+S)

## 💻 Usage

### Basic Operation

1. **Navigate to Grok Imagine**: Visit any page matching `https://grok.com/imagine/post/*`
2. **Locate the Panel**: The Grok Assistant panel appears in the bottom-right corner
3. **Start Monitoring**: 
   - Click **Start** to manually arm the assistant
   - Or enable **Auto start** in Settings to automatically monitor each generation

### Control Panel

The floating panel displays:
- **Status**: Current operation state
- **Attempts**: Current retry count vs. maximum retries
- **Total Retries**: Cumulative retries sent during the session
- **Phase**: Internal state machine phase
- **Progress Bar**: Visual cooldown timer with seconds remaining

### Settings

Click the **Settings** toggle to access:

#### Max Retries (Slider)
- Range: 1-20 attempts
- Default: 3
- Determines how many times to retry before giving up

#### Cooldown (Input)
- Minimum: 500ms
- Default: 2000ms (2 seconds)
- Time to wait between retry attempts

#### Enhanced Detection (Checkbox)
- When enabled: Monitors for cases where progress completes but no video renders
- When disabled: Only monitors for explicit moderation toasts
- Recommended: **Enabled** for maximum reliability

#### Auto Start (Checkbox)
- When enabled: Automatically begins monitoring when Grok starts generating
- When disabled: Requires manual "Start" button click
- Recommended: **Enabled** for hands-free operation

#### Auto Upscale (Checkbox)
- When enabled: Automatically clicks the upscale option after successful generations
- When disabled: Manual upscaling required
- Includes **Trigger upscale now** button for manual control

## 🔧 Configuration

All settings are automatically saved to browser storage and persist across sessions.

### Default Settings
```javascript
{
  maxRetries: 3,
  cooldownMs: 2000,
  enhancedDetection: true,
  autoStartEnabled: true,
  autoUpscaleEnabled: false
}
```

## 🛠️ Development

### Project Structure
```
grok-assistant/
├── src/
│   ├── App.jsx                 # Main React component
│   ├── main.jsx                # Entry point
│   ├── utils/
│   │   ├── generationStateMachine.ts  # TypeScript state machine
│   │   ├── grokAutomation.js          # DOM automation logic
│   │   └── storage.js                 # Settings persistence
├── doc/
│   ├── Design.md               # Architecture documentation
│   └── Sample Components.md    # Component examples
├── package.json
├── vite.config.js              # Vite + userscript configuration
└── tsconfig.json
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type-safe state management
- **Vite**: Build tool and dev server
- **vite-plugin-monkey**: Userscript bundling and metadata injection
- **Tampermonkey API**: Browser storage (GM_getValue/GM_setValue)

## 🎯 How It Works

### State Machine Architecture

The assistant uses a finite state machine with six states:

1. **Idle**: Waiting for user action or auto-start trigger
2. **Monitoring**: Actively watching for moderation toasts and generation anomalies
3. **Moderation**: Cooldown timer running after moderation detected
4. **Waiting-Video**: Cooldown timer running after anomaly detected
5. **Generating**: Retry button clicked, waiting for progress indicator
6. **Terminal**: Stopped due to quota limits or max retries reached

### Detection Mechanisms

#### Moderation Detection
- Monitors `section[aria-label="Notifications alt+T"]` for toast notifications
- Matches toast content containing "Content Moderated. Try a different idea."
- Triggers retry after cooldown period

#### Enhanced Anomaly Detection
- Watches for progress indicator
- Detects when progress disappears without video element appearing
- Triggers retry if no `#sd-video` or `#hd-video` element found

#### Quota Limit Detection
- Scans toasts for keywords: "limit reached", "quota", "upgrade to unlock"
- Transitions to terminal state to prevent infinite retry loops

### Retry Mechanism

1. **Event Detected**: Moderation toast or generation anomaly
2. **Cooldown Start**: Progress bar begins countdown
3. **Button Click**: After cooldown, clicks the video generation button
4. **Attempt Tracking**: Increments counter and updates global retry count
5. **Success/Failure**: 
   - Success: Returns to monitoring (if auto-start enabled) or idle
   - Failure: Repeats until max retries reached

### Auto-Upscale Workflow

1. Waits for video element (`#sd-video` or `#hd-video`) to appear
2. Clicks **More Options** button
3. Waits for menu to open (`div[role="menu"][data-state="open"]`)
4. Clicks third menu item (zero-indexed position 2: "升级视频")
5. Debounces multiple success events within 1 second

## 🐛 Troubleshooting

### Script Not Activating
- Verify you're on a page matching `https://grok.com/imagine/post/*`
- Check Tampermonkey is enabled and script is active
- Open browser console (F12) and look for errors

### Retries Not Firing
- Ensure **Start** button is clicked or **Auto start** is enabled
- Verify cooldown period has elapsed (check progress bar)
- Check browser console for selector errors if Grok's UI has changed

### Settings Not Saving
- Verify Tampermonkey has storage permissions
- Check that `GM_getValue` and `GM_setValue` grants are present in script metadata
- Try reinstalling the script

### Upscale Not Working
- Verify **Auto upscale** is enabled in Settings
- Check that video has fully rendered before triggering
- Use **Trigger upscale now** button to test manually
- Verify menu item index hasn't changed in Grok's UI

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow existing code style
2. Update documentation for new features
3. Test thoroughly on Grok Imagine pages
4. Ensure TypeScript types are accurate

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Huipp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) and [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
- React components and state management patterns
- TypeScript finite state machine architecture

## 📞 Support

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)

---

**Note**: This is an unofficial userscript and is not affiliated with or endorsed by Grok or X (formerly Twitter). Use at your own discretion.
