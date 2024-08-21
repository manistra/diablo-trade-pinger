import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico'
const { updateElectronApp } = require('update-electron-app')

updateElectronApp()

let isCleanupInFinished = false

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1800,
    minWidth: 1600,
    minHeight: 900,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Handle the window close event
  mainWindow.on('close', (event) => {
    if (!isCleanupInFinished) {
      event.preventDefault() // Prevent the window from closing if cleanup is in progress

      mainWindow.webContents.send('close-request') // Notify renderer process to handle cleanup

      // FML This is awful but a safty net for now
      setTimeout(() => {
        isCleanupInFinished = true
        setTimeout(() => {
          app.quit()
        }, 2000)
      }, 5000)
    } else {
      // Allow the window to close if cleanup is not in progress
      app.quit()
    }
  })

  ipcMain.on('cleanup-complete', () => {
    isCleanupInFinished = true

    app.quit() // Quit the app after cleanup is complete
  })

  ipcMain.on('focus-window', () => {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(true)
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus({
        steal: true
      })
      mainWindow.show()
      mainWindow.setAlwaysOnTop(false)
    } else {
      createWindow()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
if (require('electron-squirrel-startup') === true) app.quit()
