# 🎮 HTML5 Gaming Website — NoevoApps Arcade

## 🧭 Overview
This project is a **simple browser-based game hub** built with **React + TypeScript + Vite + TailwindCSS**.  
It fetches free HTML5 games directly from the [GameMonetize Feed API](https://gamemonetize.com/feed.php) and displays them cleanly and responsively.

The site is lightweight, requires **no user login**, and serves as a base for future expansion — such as adding categories, search, and analytics.

---

## 🚀 Tech Stack
- **Frontend:** React + TypeScript  
- **Bundler:** Vite  
- **Styling:** Tailwind CSS  
- **Data Source:** [GameMonetize JSON Feed](https://gamemonetize.com/feed.php?format=0&num=50&page=1)
- **Deployment:** Vercel / Netlify / GitHub Pages  

---

## ⚙️ Feed Information
**API Endpoint Used:**
https://gamemonetize.com/feed.php?format=0&num=50&page=1

csharp
Copy code

**Feed Format:** JSON  
**Games per page:** 50  

Each game object includes:
```json
{
  "title": "Moto X3M",
  "url": "https://html5.gamemonetize.com/motox3m/",
  "thumbnail": "https://img.gamemonetize.com/motox3m.jpg",
  "category": "Racing",
  "description": "Race through challenging levels and perform stunts."
}
🧩 Features
Displays 50 games from the GameMonetize JSON feed.

Responsive grid layout.

Each game card includes a thumbnail, title, and play button.

When a user clicks a game, it opens an embedded iframe page to play directly.

Simple sidebar with category navigation (optional future enhancement).

No authentication or database — fully client-side