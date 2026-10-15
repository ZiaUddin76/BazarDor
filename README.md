# 🛒 বাজার দর (BazarDor)

**BazarDor** is a Bengali-language market price tracking web application that helps users explore everyday product prices in Bangladesh, compare market rates, and understand daily price changes—all in one place.

🌐 **Live Demo:** https://bazardor-mu.vercel.app/

## ✨ Key Features

- 📊 **Daily Price Tracking** — Explore current prices of everyday products with indicators showing price changes compared to the previous day.
- 🏪 **Market Price Comparison** — Compare minimum, maximum, and average prices across different markets.
- 🗂️ **Category-Based Browsing** — Discover products by category and explore prices with convenient sorting options.
- 🔐 **Authentication** — Sign up and sign in using email/password, Google, or GitHub.
- 🔒 **Protected Product Details** — Access product details through authenticated user flows.
- 👤 **User-Friendly Interface** — Responsive design, Bengali localization, loading skeletons, toast notifications, and custom not-found pages.

## 🛠️ Technologies Used

- **Next.js** — App Router and server-rendered pages
- **React** — Component-based user interface
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication and social sign-in
- **MongoDB** — Database integration
- **React Hot Toast** — Toast notifications and user feedback
- **BazarDor API** — Product and market price data

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB database
- OAuth credentials for the social providers you want to enable

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ZiaUddin76/BazarDor.git
cd BazarDor
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root and add the required MongoDB connection string, Better Auth configuration, and OAuth credentials.

Use the environment variable names expected by your project configuration. Never commit `.env.local` or expose your secrets in the repository.

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Project Goal

BazarDor aims to make everyday market price information more accessible to people in Bangladesh through a simple, localized, and easy-to-use digital experience.

## 👨‍💻 Developer

**Zia Uddin**

- GitHub: [@ZiaUddin76](https://github.com/ZiaUddin76)
- Project Repository: [BazarDor](https://github.com/ZiaUddin76/BazarDor)
