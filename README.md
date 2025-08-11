# 🎮 Developer Quest - Gamified Portfolio

An epic gamified personal portfolio built with React, TypeScript, and Tailwind CSS. Transform your portfolio browsing experience into an interactive adventure!

## 🚀 Features

- **🎯 Interactive Gaming Experience** - Level up, gain XP, and unlock achievements
- **🏆 Achievement System** - Complete challenges to unlock badges
- **⚡ Skill Tree** - Train and level up your technical skills
- **🎨 Beautiful UI** - Modern design with particle effects and animations
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Fast Performance** - Built with Vite for lightning-fast development
- **🌐 GitHub Pages Ready** - Automatic deployment to GitHub Pages

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

## 🎮 How to Play

### Game Mechanics:
- **🎯 Experience Points (XP)**: Gain XP by interacting with different sections
- **🏆 Achievements**: Unlock badges by completing specific actions
- **⚡ Skill Training**: Level up your technical skills by clicking "Train Skill"
- **🌟 Level Progression**: Level up your overall character by gaining XP
- **✨ Particle Effects**: Enjoy visual feedback when achieving milestones

### Available Achievements:
- **First Steps**: Visit the portfolio for the first time
- **Portfolio Explorer**: Click on all sections
- **Social Butterfly**: Connect on all social platforms
- **Skill Master**: Reach level 5 in any skill

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Add gamified portfolio"
git push origin gamify
```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy your site

3. **Access your site**:
   - Your gamified portfolio will be available at: `https://yourusername.github.io/personal_portfolio/gamify/`
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
