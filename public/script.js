async function fetchFiles() {
    try {
        const response = await fetch('/api/list');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const files = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        
        if (files.length === 0) {
            fileList.innerHTML = '<li class="text-gray-500 italic">No files found. Create your first file below!</li>';
            return;
        }
        
        files.forEach(file => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors';
            li.innerHTML = `
                <a href="#" onclick="viewFile('${file.replace('.txt', '')}')" class="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2">
                    📄 ${file}
                </a>
                <button onclick="deleteFileList('${file.replace('.txt', '')}')" class="text-red-500 hover:text-red-600 dark:hover:text-red-400 px-2 py-1 rounded transition-colors">
                    🗑️ Delete
                </button>
            `;
            fileList.appendChild(li);
        });
    } catch (err) {
        console.error('Fetch files error:', err);
        showMessage(`Error fetching files: ${err.message}`, 'error');
    }
}

async function viewFile(filename) {
    try {
        const response = await fetch(`/api/read?filename=${encodeURIComponent(filename)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            showMessage(data.error, 'error');
            return;
        }
        const fileContent = document.getElementById('fileContent');
        fileContent.querySelector('h3').textContent = filename + '.txt';
        fileContent.querySelector('pre').textContent = data.content;
        fileContent.classList.remove('hidden');
        fileContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
        console.error('View file error:', err);
        showMessage(`Error reading file: ${err.message}`, 'error');
    }
}

function closeFileView() {
    document.getElementById('fileContent').classList.add('hidden');
}

async function createFile() {
    const filename = document.getElementById('createFilename').value.trim();
    const content = document.getElementById('createContent').value.trim();
    
    if (!filename) {
        showMessage('Filename is required', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
        showMessage('Filename can only contain letters, numbers, underscores, or hyphens', 'error');
        return;
    }
    if (!content) {
        showMessage('Content is required', 'error');
        return;
    }
    
    try {
        console.log('Creating file:', { filename, content });
        const response = await fetch('/api/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Create file response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('createFilename').value = '';
            document.getElementById('createContent').value = '';
            fetchFiles();
        }
    } catch (err) {
        console.error('Create file error:', err);
        showMessage(`Error creating file: ${err.message}`, 'error');
    }
}

async function appendFile() {
    const filename = document.getElementById('appendFilename').value.trim();
    const content = document.getElementById('appendContent').value.trim();
    
    if (!filename) {
        showMessage('Filename is required', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
        showMessage('Filename can only contain letters, numbers, underscores, or hyphens', 'error');
        return;
    }
    if (!content) {
        showMessage('Content to append is required', 'error');
        return;
    }
    
    try {
        console.log('Appending to file:', { filename, content });
        const response = await fetch('/api/append', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Append file response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('appendFilename').value = '';
            document.getElementById('appendContent').value = '';
            fetchFiles();
        }
    } catch (err) {
        console.error('Append file error:', err);
        showMessage(`Error appending to file: ${err.message}`, 'error');
    }
}

async function renameFile() {
    const oldName = document.getElementById('oldName').value.trim();
    const newName = document.getElementById('newName').value.trim();
    
    if (!oldName || !newName) {
        showMessage('Both filenames are required', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(oldName) || !/^[a-zA-Z0-9_-]+$/.test(newName)) {
        showMessage('Filenames can only contain letters, numbers, underscores, or hyphens', 'error');
        return;
    }
    
    try {
        console.log('Renaming file:', { oldName, newName });
        const response = await fetch('/api/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName, newName })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Rename file response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('oldName').value = '';
            document.getElementById('newName').value = '';
            fetchFiles();
        }
    } catch (err) {
        console.error('Rename file error:', err);
        showMessage(`Error renaming file: ${err.message}`, 'error');
    }
}

async function copyFile() {
    const originalName = document.getElementById('originalName').value.trim();
    const copyName = document.getElementById('copyName').value.trim();
    
    if (!originalName || !copyName) {
        showMessage('Both filenames are required', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(originalName) || !/^[a-zA-Z0-9_-]+$/.test(copyName)) {
        showMessage('Filenames can only contain letters, numbers, underscores, or hyphens', 'error');
        return;
    }
    
    try {
        console.log('Copying file:', { originalName, copyName });
        const response = await fetch('/api/copy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalName, copyName })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Copy file response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('originalName').value = '';
            document.getElementById('copyName').value = '';
            fetchFiles();
        }
    } catch (err) {
        console.error('Copy file error:', err);
        showMessage(`Error copying file: ${err.message}`, 'error');
    }
}

async function deleteFile() {
    const filename = document.getElementById('deleteFilename').value.trim();
    
    if (!filename) {
        showMessage('Filename is required', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
        showMessage('Filename can only contain letters, numbers, underscores, or hyphens', 'error');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete '${filename}.txt'?`)) {
        return;
    }
    
    try {
        console.log('Deleting file:', { filename });
        const response = await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Delete file response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            document.getElementById('deleteFilename').value = '';
            fetchFiles();
            closeFileView();
        }
    } catch (err) {
        console.error('Delete file error:', err);
        showMessage(`Error deleting file: ${err.message}`, 'error');
    }
}

async function deleteFileList(filename) {
    if (!confirm(`Are you sure you want to delete ${filename}.txt?`)) return;
    try {
        console.log('Deleting file from list:', { filename });
        const response = await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Delete file list response:', data);
        showMessage(data.message || data.error, data.error ? 'error' : 'success');
        if (!data.error) {
            fetchFiles();
            closeFileView();
        }
    } catch (err) {
        console.error('Delete file list error:', err);
        showMessage(`Error deleting file: ${err.message}`, 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `mb-4 text-center font-medium p-3 rounded-lg ${
        type === 'error' 
            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' 
            : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
    }`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 4000);
}

window.onload = fetchFiles;