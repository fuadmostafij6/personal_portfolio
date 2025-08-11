# Personal Portfolio

A modern personal portfolio built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Fast development with Vite
- GitHub Pages deployment ready

## 🛠️ Development

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build

To build the project for production:

```bash
npm run build
```

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy your site

3. **Access your site**:
   - Your portfolio will be available at: `https://yourusername.github.io/personal_portfolio/`
   - The first deployment may take a few minutes

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. Go to repository **Settings** → **Pages**
3. Select **Deploy from a branch**
4. Choose the `gh-pages` branch and `/` folder
5. Click **Save**

## 📁 Project Structure

```
personal_portfolio/
├── src/                 # Source files
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .github/workflows/  # GitHub Actions
└── dist/               # Build output (generated)
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
