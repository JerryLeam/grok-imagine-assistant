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
