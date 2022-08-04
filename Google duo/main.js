// Modules to control application life and create native browser window
const {app, BrowserWindow, shell} = require('electron')
const contextMenu = require('electron-context-menu');
const path = require('path')

app.commandLine.appendSwitch('enable-tcp-fastopen')

contextMenu({
	prepend: (defaultActions, params, browserWindow, dictionarySuggestions) => [
		{
			label: 'Search Google for “{selection}”',
			// Only show it when right-clicking text
			visible: params.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
			}
		}
	]
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 750,
    icon: __dirname + '/icon.png',
    backgroundColor: '#FFFFF',
    webPreferences: {
     contextIsolation: true,
     spellcheck: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('splash.html')
  setTimeout(function () {
    mainWindow.loadURL('https://duo.google.com/?web&utm_source=marketing_page_button_main',{ userAgent: "Mozilla/5.0 (; rv:88.0) Gecko/20100101 Firefox/88.0"});
  }, 3000) // Load store page after 3 secs
  mainWindow.maximize() // start maximized
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setMenu(null)
  mainWindow.show();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
