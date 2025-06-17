# Content Management System (CMS)

A lightweight CMS built with **Express.js** and **Tailwind CSS**, allowing users to create, read, append, rename, copy, and delete text files via a clean and responsive web interface.

---

## 🚀 Features

* 📄 **File Operations**: Create, read, append, rename, copy, and delete `.txt` files.
* 🌗 **Theme Toggle**: Light/Dark mode switcher using `localStorage` for persistence.
* 📱 **Responsive Design**: Built with Tailwind CSS, optimized for mobile and desktop.
* 📁 **Local File Storage**: All files are saved inside the `content/` directory.
* 🎨 **Animated Background**: Starry animated canvas background adds a visual touch.
* 💻 **Server-Side Logic**: All backend file handling is managed through `server.js` using Express.js.
* 📜 **File System Module**: Utilizes Node.js `fs` and `fs/promises` modules for asynchronous file operations.

---

## 📦 Prerequisites

* **Node.js** (v18 or later)
* **npm** (v9 or later)

---

## 🛠️ Setup

```bash
git clone https://github.com/PranavHendre02/Content-Management-System.git
cd Content-Management-System
npm install
mkdir content
npm run build:css
```

---

## ▶️ Running Locally

```bash
npm start
```

* Visit: `http://localhost:3000`
* Use the UI to create/read/delete `.txt` files.
* Toggle light/dark theme via navbar.

---

## 🌐 Deployment

📌 **Deployed on Netlify**
Note: Only the frontend is hosted on Netlify. The backend (`server.js`) runs separately as it requires a Node.js server environment.

---

## 📁 File Storage Details

* **Local Environment**: Files are saved in `/content/` folder.

---

## 📂 File Structure

```
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
```

---

## 🧩 Dependencies

* **express** - Web server
* **tailwindcss** - Utility-first CSS framework
* **fs / fs.promises** - Node.js built-in modules for file system operations

---

## 🌓 Theme Toggle

* Switch between light (`bg-gray-100 text-gray-900`) and dark (`bg-gray-950 text-white`) modes.
* State is saved in `localStorage`.
* Uses Tailwind's `dark:` variant classes.

---

## 🛠️ Troubleshooting

* **CSS Not Showing?** Run:

  ```bash
  npm run build:css
  ```
* **Theme Toggle Fails?** Ensure `tailwind.config.js` has:

  ```js
  darkMode: 'class'
  ```
* **Express Errors?** Run:

  ```bash
  npm install
  ```

---

## 🪪 License

MIT License

---

## 👨‍💻 Author

Developed by **Pranav Hendre** 🚀
