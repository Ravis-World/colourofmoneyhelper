import { app, BrowserWindow } from 'electron';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "The Colour of Money - Host Board",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    if (!app.isPackaged) {
        void win.loadURL('http://127.0.0.1:5173');
    } else {
        void win.loadFile(join(currentDirectory, '../dist/index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});