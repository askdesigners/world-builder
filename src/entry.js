const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const dataFile = '../mapData/mapStore.json';
const jsonfile = require('jsonfile');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  setTimeout(() => {
    // Create the browser window.
    win = new BrowserWindow({ width: 1200, height: 800 })

    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: 'localhost:4200',
      protocol: 'http:',
      slashes: true
    }))

    // Open the DevTools when in dev mode.
    if (process.env.NODE_ENV == 'development')
      win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }, 1000)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('getmap', (event, dimensions) => {
  console.log('getting map');
  event.sender.send('getmap-reply', formatForApp(buildEmptyMap(dimensions), jsonfile.readFileSync(path.join(__dirname, dataFile)).map));
});

ipcMain.on('updatemap', (event, newMapData) => {
  let err = jsonfile.writeFileSync(path.join(__dirname, dataFile), formatForSave(newMapData));
  console.error('Saved file', err);
});



function buildEmptyMap(dimensions) {
  console.log('build empty map');
  let rows = Array.apply(null, { length: dimensions[1] }).map(() => []);
  let cols = Array.apply(null, { length: dimensions[0] }).map(() => []);
  let newMap = {};

  rows.map((rElem, ri) => {
    return cols.map((cElem, ci) => {
      let key = `${ci + 1}-${ri + 1}`
      newMap[key] = {
        key,
        level: '',
        name: '',
        descriptiveName: '',
        description: '',
        w: false,
        e: false,
        n: false,
        s: false,
      };
    });
  });
  return newMap;
}

function formatForApp(emptyMap, data) {
  console.log('formatting map data', Object.keys(emptyMap).length, data.length);
  return data.reduce((m, place) => {
    let key = place.x + '-' + place.y;
    m[key] = {
      key: key,
      level: place.level,
      name: place.name,
      descriptiveName: place.descriptiveName,
      description: place.description,
      w: place.blockedTo.indexOf('w') > -1,
      e: place.blockedTo.indexOf('e') > -1,
      n: place.blockedTo.indexOf('n') > -1,
      s: place.blockedTo.indexOf('s') > -1
    }
    console.log("returning" , key, m[key].name, place.name);
    return m;
  }, emptyMap);
}

function formatForSave(newMapData) {
    let keys = Object.keys(newMapData);
    return {
      map: keys.reduce((acc, k)=>{
        let xy = k.split('-');
        let blocks = [newMapData[k].w ? 'w':null, newMapData[k].e ? 'e':null, newMapData[k].n ? 'n':null, newMapData[k].s ? 's':null].filter(e => e);
        let tPlace = {
          x: xy[0],
          y: xy[1],
          level: 0,
          name: newMapData[k].name,
          descriptiveName: newMapData[k].descriptiveName,
          description: newMapData[k].description,
          blockedTo: blocks
        }
        return acc.concat(tPlace);
      },[])
    };
}