const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const port = 3000;
const contentDir = path.join(__dirname, 'content');

async function ensureContentDir() {
    try {
        await fs.mkdir(contentDir, { recursive: true });
    } catch (err) {
        console.error('Error creating content directory:', err);
    }
}
ensureContentDir();

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/list', async (req, res) => {
    try {
        const files = await fs.readdir(contentDir);
        res.json(files.filter(file => file.endsWith('.txt')));
    } catch (err) {
        res.status(500).json({ error: 'Failed to list files' });
    }
});

app.get('/api/read', async (req, res) => {
    const { filename } = req.query;
    if (!filename) return res.status(400).json({ error: 'Filename required' });
    try {
        const content = await fs.readFile(path.join(contentDir, `${filename}.txt`), 'utf8');
        res.json({ content });
    } catch (err) {
        res.status(500).json({ error: 'Failed to read file' });
    }
});

app.post('/api/write', async (req, res) => {
    const { filename, content } = req.body;
    if (!filename || !content) return res.status(400).json({ error: 'Filename and content required' });
    try {
        await fs.writeFile(path.join(contentDir, `${filename}.txt`), content);
        res.json({ message: 'File created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to write file' });
    }
});

app.post('/api/append', async (req, res) => {
    const { filename, content } = req.body;
    if (!filename || !content) return res.status(400).json({ error: 'Filename and content required' });
    try {
        await fs.appendFile(path.join(contentDir, `${filename}.txt`), `\n${content}`);
        res.json({ message: 'Content appended' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to append to file' });
    }
});

app.post('/api/rename', async (req, res) => {
    const { oldName, newName } = req.body;
    if (!oldName || !newName) return res.status(400).json({ error: 'Both filenames required' });
    try {
        await fs.rename(
            path.join(contentDir, `${oldName}.txt`),
            path.join(contentDir, `${newName}.txt`)
        );
        res.json({ message: 'File renamed' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to rename file' });
    }
});

app.post('/api/copy', async (req, res) => {
    const { originalName, copyName } = req.body;
    if (!originalName || !copyName) return res.status(400).json({ error: 'Both filenames required' });
    try {
        await fs.copyFile(
            path.join(contentDir, `${originalName}.txt`),
            path.join(contentDir, `${copyName}.txt`)
        );
        res.json({ message: 'File copied' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to copy file' });
    }
});

app.post('/api/delete', async (req, res) => {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'Filename required' });
    try {
        await fs.unlink(path.join(contentDir, `${filename}.txt`));
        res.json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});