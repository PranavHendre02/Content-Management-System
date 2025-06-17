Content Management System (CMS)
A lightweight CMS built with Express.js and Tailwind CSS, allowing users to create, read, append, rename, copy, and delete text files via a clean and responsive web interface.

🚀 Features

📄 File Operations: Create, read, append, rename, copy, and delete .txt files.
📱 Responsive Design: Built with Tailwind CSS, optimized for mobile and desktop.
📁 Local File Storage: All files are saved inside the content/ directory.
🎨 Animated Background: Dark background with moving dots animation using HTML5 Canvas.
💻 Server-Side Logic: All backend file handling is managed through server.js using Express.js.
📜 File System Module: Utilizes Node.js fs and fs/promises modules for asynchronous file operations.
📏 Horizontal File List: Files are displayed horizontally in the Files section for all screen sizes.


📦 Prerequisites

Node.js (v18 or later)
npm (v9 or later)


🛠️ Setup

Clone the repository:
git clone https://github.com/PranavHendre02/Content-Management-System.git
cd Content-Management-System


Install dependencies:
npm install


Create the content/ folder to store .txt files:
mkdir content


Build the Tailwind CSS output:
npm run build:css




▶️ Running Locally

Start the Express server:
npm start


Open your browser and visit:
http://localhost:3000


Use the web interface to:

Create, read, append, rename, copy, or delete .txt files.
View files displayed horizontally in the Files section with a dynamic moving dots background.



Note: Ensure the content/ folder exists in the project root to store files. The server runs on port 3000 by default.

🌐 Deployment
📌 Deployed on NetlifyNote: Only the frontend (index.html, script.js, output.css) is hosted on Netlify. The backend (server.js) requires a separate Node.js server environment to handle file operations.

📁 File Storage Details

Local Environment: All .txt files are stored in the /content/ folder in the project root. Ensure this folder exists and has write permissions before running the server.


📂 File Structure
Content-Management-System/
├── content/                 # Stores text files
├── public/
│   ├── css/
│   │   └── output.css       # Tailwind CSS build
│   ├── index.html           # UI frontend
│   └── script.js            # Client-side JavaScript
├── src/
│   └── input.css            # Tailwind source CSS
├── server.js                # Express backend logic for file operations
├── package.json
├── tailwind.config.js
├── .gitignore


🧩 Dependencies

express - Web server
cors - Enables cross-origin resource sharing for frontend-backend communication
tailwindcss - Utility-first CSS framework
fs / fs.promises - Node.js built-in modules for file system operations


🎨 UI Features

Horizontal File Display: The Files section uses a flex layout to display files horizontally with wrapping, consistent across all screen sizes.
Animated Background: A dark #1a202c background with moving white dots, rendered via HTML5 Canvas for a subtle, starry effect.
Dark Theme: Uses Tailwind CSS classes for a cohesive dark theme (bg-gray-900, text-white, etc.).


🛠️ Troubleshooting

CSS Not Showing? Run:
npm run build:css

Ensure tailwind.config.js and src/input.css are present.

Files Not Created? Check:

The content/ folder exists in the project root (mkdir content).
The folder has write permissions (chmod -R 755 content on Linux/Mac).
The backend is running (npm start) and accessible at http://localhost:3000.


CORS Errors? Verify:

The cors package is installed (npm install cors).
The backend includes app.use(cors()) in server.js.


Express Errors? Run:
npm install




🪪 License
MIT License

👨‍💻 Author
Developed by Pranav Hendre 🚀
