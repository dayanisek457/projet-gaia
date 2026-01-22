# Android SDK Location Fix

## Problem

When building the Android APK on GitHub Codespace (or similar environments), the build would fail with the error:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
> SDK location not found. Define a valid SDK location with an ANDROID_HOME 
  environment variable or by setting the sdk.dir path in your project's 
  local properties file at '/workspaces/projet-gaia/android/local.properties'.
```

## Root Cause

The Android build system (Gradle) requires the location of the Android SDK to be specified either through:
1. The `ANDROID_HOME` environment variable, OR
2. A `local.properties` file in the `android/` directory with `sdk.dir=<path>`

The previous setup scripts only handled Java installation but did not configure the Android SDK location.

## Solution

Enhanced the `setup-android-env.sh` and `build-android.sh` scripts to:

### 1. Automatic Android SDK Detection

The setup script now intelligently detects and uses existing Android SDK installations:

```bash
# Priority order:
1. Pre-existing ANDROID_HOME environment variable
2. System-wide SDK at /usr/local/lib/android/sdk (GitHub Codespace)
3. User SDK at $HOME/android-sdk (previously installed)
4. Download and install new SDK if none found
```

### 2. Automatic `local.properties` Creation

Both scripts now automatically create or update the `android/local.properties` file with the correct SDK path:

```properties
sdk.dir=/usr/local/lib/android/sdk
```

### 3. Required Components Installation

When installing a new SDK, the script installs the required components:
- `platform-tools` - ADB and other platform tools
- `platforms;android-35` - Android 15 SDK platform
- `build-tools;35.0.0` - Build tools for API 35

### 4. Persistent Configuration

The SDK location is added to `~/.bashrc` with dynamic detection logic, ensuring it persists across sessions:

```bash
# Android SDK pour build
# Détection automatique du SDK Android
if [ -d "/usr/local/lib/android/sdk" ]; then
    export ANDROID_HOME="/usr/local/lib/android/sdk"
elif [ -d "$HOME/android-sdk" ]; then
    export ANDROID_HOME="$HOME/android-sdk"
fi
```

## Security Improvements

1. **Secure Downloads**: Uses `mktemp -d` for secure temporary directory creation
2. **Download Validation**: Verifies downloaded files exist and are non-empty before extraction
3. **Explicit License Acceptance**: Informs users about Android SDK license acceptance
4. **Cleanup**: Properly removes temporary files after installation

## Usage

### Quick Start (Recommended)

```bash
# 1. Configure environment (detects/installs Android SDK)
npm run android:env

# 2. Build APK
npm run android:build
```

### Manual Steps

```bash
# Run setup script directly
./scripts/setup-android-env.sh

# Or just run the build (it will check and configure if needed)
./scripts/build-android.sh
```

## Files Modified

1. **scripts/setup-android-env.sh**
   - Added Android SDK detection logic
   - Added SDK installation if not found
   - Added `local.properties` file creation
   - Added required SDK components installation
   - Improved security with mktemp and validation

2. **scripts/build-android.sh**
   - Added Android SDK verification
   - Added `local.properties` creation/update
   - Added helpful error messages

3. **ANDROID_BUILD_GUIDE.md**
   - Added troubleshooting section for SDK errors
   - Updated quick start instructions
   - Clarified automatic SDK detection

4. **ANDROID_SETUP_SUMMARY.md**
   - Updated with SDK detection details

## Testing

Tested successfully on GitHub Codespace with Ubuntu 24.04:
- ✅ SDK detection works correctly
- ✅ `local.properties` file is created with correct path
- ✅ Build completes successfully
- ✅ APK is generated at `android/app/build/outputs/apk/debug/app-debug.apk`
- ✅ APK size: ~17MB (as expected)

## Compatibility

- Works on GitHub Codespace (pre-installed Android SDK)
- Works on clean Linux environments (installs Android SDK)
- Works on systems with existing Android SDK installations
- Backwards compatible with existing setups

## Future Considerations

- The download URL for Android command-line tools may change over time
- Consider adding checksum verification for downloaded SDK files
- Consider caching the SDK installation in CI/CD environments
