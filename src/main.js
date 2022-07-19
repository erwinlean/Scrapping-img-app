"use stric"
//app call

const {app, BrowserWindow, Menu, shell} = require ("electron");
const path = require('path');

require("electron-reload")(__dirname);

//creacion de aplicacion vista
const createWindows = () => {
    window = new BrowserWindow ({
        width: 800, //px
        height: 600,
        //frame:false, para modificar el manu y personalizar, crear menu, no utilizar por default de electron
        //transparent: true, same as the last line
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.setIcon(path.join(__dirname, 'ui/assets/icons/t-rexweb.jpeg'));

    window.loadFile("src/ui/index.html")

    const menu = Menu.buildFromTemplate([{
        label: "Menu",
        submenu: [
            {
                label: "About scrapping",
                click(){
                    shell.openExternal("https://es.wikipedia.org/wiki/Web_scraping")
                }
            },
            {
                label: "About Us",
                click(){
                    shell.openExternal("https://github.com/erwinlean")
                }
            },
            {
                label: "Exit",
                click(){
                    app.quit();
            }}
        ]
    }])
    Menu.setApplicationMenu(menu);
}

//windows open when ready and close windows
app.whenReady().then(() => {
    createWindows()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindows()
        }
    })
})
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})