const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
const contentDir = path.join(__dirname, 'content');

// Validate filename to prevent path traversal and invalid characters
function validateFilename(filename) {
    const invalidChars = /[\/\\:*?"<>|]/;
    if (!filename || invalidChars.test(filename)) {
        return false;
    }
    return true;
}

async function ensureContentDir() {
    try {
        await fs.mkdir(contentDir, { recursive: true });
        console.log('Content directory ensured:', contentDir);
    } catch (err) {
        console.error('Error creating content directory:', err);
    }
}
ensureContentDir();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/list', async (req, res) => {
    try {
        const files = await fs.readdir(contentDir);
        const txtFiles = files.filter(file => file.endsWith('.txt'));
        console.log('Listing files:', txtFiles);
        res.json(txtFiles);
    } catch (err) {
        console.error('List files error:', err);
        res.status(500).json({ error: 'Failed to list files' });
    }
});

app.get('/api/read', async (req, res) => {
    const { filename } = req.query;
    if (!filename || !validateFilename(filename)) {
        return res.status(400).json({ error: 'Valid filename required' });
    }
    try {
        const content = await fs.readFile(path.join(contentDir, `${filename}.txt`), 'utf8');
        console.log(`Read file: ${filename}.txt`);
        res.json({ content });
    } catch (err) {
        console.error(`Read file error (${filename}.txt):`, err);
        res.status(500).json({ error: 'Failed to read file' });
    }
});

app.post('/api/write', async (req, res) => {
    const { filename, content } = req.body;
    if (!filename || !validateFilename(filename)) {
        return res.status(400).json({ error: 'Valid filename required' });
    }
    if (!content) {
        return res.status(400).json({ error: 'Content required' });
    }
    try {
        const filePath = path.join(contentDir, `${filename}.txt`);
        await fs.writeFile(filePath, content);
        console.log(`File created: ${filename}.txt`);
        res.json({ message: 'File created' });
    } catch (err) {
        console.error(`Write file error (${filename}.txt):`, err);
        res.status(500).json({ error: 'Failed to write file' });
    }
});

app.post('/api/append', async (req, res) => {
    const { filename, content } = req.body;
    if (!filename || !validateFilename(filename)) {
        return res.status(400).json({ error: 'Valid filename required' });
    }
    if (!content) {
        return res.status(400).json({ error: 'Content required' });
    }
    try {
        await fs.appendFile(path.join(contentDir, `${filename}.txt`), `\n${content}`);
        console.log(`Appended to file: ${filename}.txt`);
        res.json({ message: 'Content appended' });
    } catch (err) {
        console.error(`Append file error (${filename}.txt):`, err);
        res.status(500).json({ error: 'Failed to append to file' });
    }
});

app.post('/api/rename', async (req, res) => {
    const { oldName, newName } = req.body;
    if (!oldName || !newName || !validateFilename(oldName) || !validateFilename(newName)) {
        return res.status(400).json({ error: 'Valid filenames required' });
    }
    try {
        await fs.rename(
            path.join(contentDir, `${oldName}.txt`),
            path.join(contentDir, `${newName}.txt`)
        );
        console.log(`Renamed file: ${oldName}.txt to ${newName}.txt`);
        res.json({ message: 'File renamed' });
    } catch (err) {
        console.error(`Rename file error (${oldName}.txt to ${newName}.txt):`, err);
        res.status(500).json({ error: 'Failed to rename file' });
    }
});

app.post('/api/copy', async (req, res) => {
    const { originalName, copyName } = req.body;
    if (!originalName || !copyName || !validateFilename(originalName) || !validateFilename(copyName)) {
        return res.status(400).json({ error: 'Valid filenames required' });
    }
    try {
        await fs.copyFile(
            path.join(contentDir, `${originalName}.txt`),
            path.join(contentDir, `${copyName}.txt`)
        );
        console.log(`Copied file: ${originalName}.txt to ${copyName}.txt`);
        res.json({ message: 'File copied' });
    } catch (err) {
        console.error(`Copy file error (${originalName}.txt to ${copyName}.txt):`, err);
        res.status(500).json({ error: 'Failed to copy file' });
    }
});

app.post('/api/delete', async (req, res) => {
    const { filename } = req.body;
    if (!filename || !validateFilename(filename)) {
        return res.status(400).json({ error: 'Valid filename required' });
    }
    try {
        await fs.unlink(path.join(contentDir, `${filename}.txt`));
        console.log(`Deleted file: ${filename}.txt`);
        res.json({ message: 'File deleted' });
    } catch (err) {
        console.error(`Delete file error (${filename}.txt):`, err);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});