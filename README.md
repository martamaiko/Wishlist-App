## Running the Application Locally

### 1. Prerequisites

Make sure you have the following installed:

**Git** — to clone the repository.

* **macOS:** git is usually installed with Xcode Command Line Tools.
* **Windows:** install Git for Windows: [https://git-scm.com/download/win](https://git-scm.com/download/win)

**Node.js (LTS recommended)** and **npm** (comes with Node).

Check versions:

```bash
node -v
npm -v
```

Recommended Node version: **18.x** or **20.x**.

(Optional) Yarn or pnpm if you prefer them.

---

### 2. Clone the Repository

Open a terminal (macOS: Terminal / iTerm; Windows: PowerShell / Command Prompt / Windows Terminal) and run:

```bash
# replace <YOUR_GITHUB_URL> with the repo URL
git clone <YOUR_GITHUB_URL>
cd <repo-folder>
```

Example:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

---

### 3. Install Dependencies

**macOS / Windows (npm):**

```bash
npm install
```

**Or with Yarn:**

```bash
yarn
```

**Or with pnpm:**

```bash
pnpm install
```

If `node_modules` already exists and you want a clean install:

**macOS / Linux:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Windows (PowerShell):**

```powershell
Remove-Item -Recurse -Force node_modules,package-lock.json
npm install
```

---

### 4. Run the App in Development Mode

The project uses **Vite**. Start the dev server:

```bash
npm run dev
```

You should see something like:

```
VITE vX.Y.Z  ready in 100 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open the printed Local URL in your browser (usually `http://localhost:5173/`).



## Live Demo (GitHub Pages)
Open the deployed version here:
https://martamaiko.github.io/Wishlist-App/
