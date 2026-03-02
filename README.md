# Hydroponics

## Prerequisites

### Required

- Node.js 20.x
- Python 3.10+
- Git (latest stable)

### Platform

- iOS: macOS + Xcode
- Android: Android Studio + Android SDK/Emulator

## Installation

Install Node.js packages:
```bash
npm install
```

Install Python packages (server):
```bash
cd packages/server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
deactivate
```

## Usage

Run desktop app:
```bash
npm run desktop
```

Run mobile on web:
```bash
npm run web
```

Run mobile on iOS:
```bash
npm run ios
```

Run mobile on Android:
```bash
npm run android
```

Run terminal app:
```bash
npm run terminal
```

Show terminal help:
```bash
npm run terminal -- --help
```

Run server:
```bash
npm run server
```

Run server on a custom port:
```bash
npm run server -- --port 8000
```
