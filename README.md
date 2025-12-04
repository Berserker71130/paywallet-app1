
# 💳 Pay Wallet App

A modern, responsive financial dashboard application designed for managing multiple currency accounts (NGN, USD, EUR, GBP) and simulating real-time fund transfers. Built using *React* and styled efficiently with *Tailwind CSS*.

-----

## ✨ Features

This application provides a comprehensive interface for simulating personal finance management:

  * *Multi-Currency Account Management:* Displays up-to-date balances for Naira (NGN), US Dollar (USD), Euro (EUR), and Great British Pound (GBP) accounts.
  * *Balance Overview:* Features a prominent *Balance Section* to quickly view the total aggregated value of all accounts.
  * *Fund Transfer Module:* Includes a fully functional *"Test Fund Transfer"* form integrated into the dashboard for simulating debits and credits between selected accounts.
  * *Transaction History:* Displays a mock *Recent Transactions* table complete with dates, amounts, types, descriptions, and completion statuses.
  * *Responsive Dashboard:* Uses the utility-first approach of Tailwind CSS to ensure the layout is clean, modern, and adapts well to different screen sizes.
  * *Context API for State:* Utilizes React's Context API (AccountProvider) for global state management of accounts and transactions, ensuring data integrity across components.

-----

## 🛠️ Technologies Used

  * *Frontend Framework:* React (using Create React App)
  * *Styling:* Tailwind CSS (for rapid, utility-first styling)
  * *State Management:* React Context API & useState/useReducer hooks
  * *Deployment:* Vercel

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have *Node.js* (version 14+) and *npm* (or yarn) installed on your machine.

You also need to start the json server (MOCK API) using **npx json-server --watch db.json --port 3000** to be able to consume all endpoints from the mock API

### Installation

1.  *Clone the Repository:*

    bash
    git clone https://github.com/Berserker71130/paywallet-app1.git
    
    cd paywallet
    

3.  *Install Dependencies:*

    bash
    npm install
    # or
    yarn install
    

### Running the Application

1.  *Start the JSON Server (MOCK API):*
    npx json-server --watch db.json --port 3000
    
3. *Start the Development Server:*
   
   npm start
    
    
    The application should automatically open in your browser at http://localhost:3001.
   The application will open at http://localhost:3001 because the db.json is opened at http://localhost: 3000.

-----

## 📂 Project Structure

The key files and directories are organized as follows:


pay-wallet-app/
├── public/
├── src/
│   ├── components/       # Reusable UI components (AccountList, BalanceSection, etc.)
│   ├── context/          # Central state management (AccountProvider.js)
│   ├── pages/            # Main routing components (DashboardPage.jsx, HomePage.jsx)
│   ├── App.js            # Main application setup
│   ├── index.js          # React DOM mounting
├── package.json
└── tailwind.config.js    # Tailwind configuration file


-----

## 🌐 Deployment

This application is typically deployed using a hosting platform that supports Node.js environments, such as Vercel or Netlify.

### Vercel Deployment

1.  Ensure your project is pushed to a remote repository (GitHub).
2.  Import the project into Vercel.
3.  Vercel will automatically detect the React framework.
      * *Build Command:* npm run build
      * *Output Directory:* build

-----

## Screenshots


-----
