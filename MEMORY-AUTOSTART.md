# Memory Service Auto-Start Configuration

This document explains how the memory service is configured to start automatically when you log in to your Mac.

## Components

1. **Memory Stub Server (`memory-stub.js`)**
   - A lightweight replacement for the MCP server
   - Handles memory storage in a local JSON file
   - Runs on port 3100

2. **Start-up Script (`start-memory-service.sh`)**
   - Checks if the memory service is already running
   - Starts the service if it's not running
   - Logs activity to `~/memory-service.log`

3. **macOS LaunchAgent (`com.cursor.memory-service.plist`)**
   - Located in `~/Library/LaunchAgents/`
   - Configured to run the start-up script when you log in
   - Also runs every 2 hours to ensure the service stays active

## Verification

You can verify that the memory service is running using these commands:

```bash
# Check if the process is running
ps aux | grep memory-stub

# Check if anything is listening on port 3100
lsof -i :3100

# Test the service directly
curl http://localhost:3100
```

## Manual Management

If you need to start, stop, or check the service manually:

```bash
# Start the service
./start-memory-service.sh

# Stop the service
kill $(cat ~/.memory-service.pid)

# View logs
cat ~/memory-service.log
```

## LaunchAgent Management

To manage the LaunchAgent:

```bash
# Unload (disable) the LaunchAgent
launchctl unload ~/Library/LaunchAgents/com.cursor.memory-service.plist

# Load (enable) the LaunchAgent
launchctl load ~/Library/LaunchAgents/com.cursor.memory-service.plist

# Start the service immediately
launchctl start com.cursor.memory-service

# Stop the service
launchctl stop com.cursor.memory-service
```

## Troubleshooting

If the memory service doesn't start automatically:

1. Check the log files:
   ```bash
   cat ~/memory-service.log
   cat /tmp/cursor-memory-service.log
   cat /tmp/cursor-memory-service-error.log
   ```

2. Ensure the script is executable:
   ```bash
   chmod +x start-memory-service.sh
   ```

3. Test the script manually:
   ```bash
   ./start-memory-service.sh
   ```

4. Make sure the LaunchAgent is loaded:
   ```bash
   launchctl list | grep memory
   ``` 