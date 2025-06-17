async function fetchFiles() {
    try {
        const response = await fetch('/api/list');
        const files = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-2 bg-gray-800/50 rounded-lg';
            li.innerHTML = `
                <a href="#" onclick="viewFile('${file}')" class="text-blue-500 hover:underline">${file}</a>
                <button onclick="deleteFileList('${file}')" class="text-red-500 hover:text-red-400">Delete</button>
            `;
            fileList.appendChild(li);
        });
    } catch (err) {
        showMessage('Error fetching files', 'error');
    }
}

async function viewFile(filename) {
    try {
        const response = await fetch(`/api/read?filename=${encodeURIComponent(filename)}`);
        const data = await response.json();
        if (data.error) {
            showMessage(data.error, 'error');
            return;
        }
        const fileContent = document.getElementById('fileContent');
        fileContent.querySelector('h3').textContent = filename;
        fileContent.querySelector('pre').textContent = data.content;
        fileContent.classList.remove('hidden');
    } catch (err) {
        showMessage('Error reading file', 'error');
    }
}

async function createFile() {
    const filename = document.getElementById('createFilename').value;
    const content = document.getElementById('createContent').value;
    if (!filename || !content) {
        showMessage('Filename and content required', 'error');
        return;
    }
    try {
        const response = await fetch('/api/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('createFilename').value = '';
            document.getElementById('createContent').value = '';
            fetchFiles();
        }
    } catch (err) {
        showMessage('Error creating file', 'error');
    }
}

async function appendFile() {
    const filename = document.getElementById('appendFilename').value;
    const content = document.getElementById('appendContent').value;
    if (!filename || !content) {
        showMessage('Filename and content required', 'error');
        return;
    }
    try {
        const response = await fetch('/api/append', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('appendFilename').value = '';
            document.getElementById('appendContent').value = '';
            fetchFiles();
        }
    } catch (err) {
        showMessage('Error appending to file', 'error');
    }
}

async function renameFile() {
    const oldName = document.getElementById('oldName').value;
    const newName = document.getElementById('newName').value;
    if (!oldName || !newName) {
        showMessage('Both filenames required', 'error');
        return;
    }
    try {
        const response = await fetch('/api/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName, newName })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('oldName').value = '';
            document.getElementById('newName').value = '';
            fetchFiles();
        }
    } catch (err) {
        showMessage('Error renaming file', 'error');
    }
}

async function copyFile() {
    const originalName = document.getElementById('originalName').value;
    const copyName = document.getElementById('copyName').value;
    if (!originalName || !copyName) {
        showMessage('Both filenames required', 'error');
        return;
    }
    try {
        const response = await fetch('/api/copy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalName, copyName })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('originalName').value = '';
            document.getElementById('copyName').value = '';
            fetchFiles();
        }
    } catch (err) {
        showMessage('Error copying file', 'error');
    }
}

async function deleteFile() {
    const filename = document.getElementById('deleteFilename').value;
    if (!filename) {
        showMessage('Filename required', 'error');
        return;
    }
    try {
        const response = await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('deleteFilename').value = '';
            fetchFiles();
        }
    } catch (err) {
        showMessage('Error deleting file', 'error');
    }
}

async function deleteFileList(filename) {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;
    try {
        const response = await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        });
        const data = await response.json();
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) fetchFiles();
    } catch (err) {
        showMessage('Error deleting file', 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `mt-4 text-center font-medium ${type === 'error' ? 'text-red-500' : 'text-blue-500'}`;
    setTimeout(() => messageDiv.textContent = '', 3000);
}

window.onload = fetchFiles;