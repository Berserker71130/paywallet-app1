
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

    
    git clone https://github.com/Berserker71130/paywallet-app1.git
    
    cd paywallet
    

3.  *Install Dependencies:*

    
    npm install
    # or
    yarn install
    

### Running the Application

1.  *Start the JSON Server (MOCK API):*

    npx json-server --watch db.json --port 3000
    
3. *Start the Development Server:*
   
   npm start
    
You will be notified in the console that something is running on port 3000 will you want to use a differnt port? Press Y for Yes

    The application should automatically open in your browser at http://localhost:3001.
   
   The application will open at http://localhost:3001 because the db.json is opened at http://localhost: 3000.

   You will need an email and password to be able to gain access into the app

   The default email is *user@paywallet.com*

   The default password is *SecurePassword123*

-----

## 📂 Project Structure

The key files and directories are organized as follows:

paywallet -> public -> src ->
Components/#AccountCards.js, AccountList.js, AccountSelector.js, ActionButton.js, BalanceSection.js, MockLogin.js, PromoBanner.js, QuickActionCards.js, Sidebar.js, Topbar.js, TransactionItem.js, TransactionRow.js#/ -> Context/#AccountProvider.js, ExchangeRateProvider.js#/ -> Pages/#DashboardPage.js, HomePage.js, PaymentsPage.js, SettingsPage.js, TransactionPage.js#/ -> app.css -> app.js -> app.test.js -> index.css -> index.js -> reportWebVitals.js -> setUpTest.js -> gitignore -> package-lock.json -> package.json -> postcss.config.js -> README.md -> tailwind.config.js -> db.json


-----

## 🌐 Deployment

This application is typically deployed using a hosting platform that supports Node.js environments, such as Vercel or Netlify.

### Vercel Deployment

1.  Ensure your project is pushed to a remote repository (GitHub).
2.  Import the project into Vercel.
3.  Vercel will automatically detect the React framework.
      * *Build Command:* npm run build
      * *Output Directory:* build

        ## Contributing
        This project was developed primarily by a student team. If you find any issues or have suggestions, feel free to open a ticket or contact the repository owner

-----

## Screenshots
<img width="1366" height="768" alt="Login Page" src="https://github.com/user-attachments/assets/14a52949-f3c1-4df3-8dd0-0a25bace0166" />
This is the login page

<img width="1366" height="768" alt="Homepage" src="https://github.com/user-attachments/assets/bca6a360-e30b-4f51-95e7-d9bcff3aebaf" />
This is the Homepage

<img width="1366" height="768" alt="Dashboard" src="https://github.com/user-attachments/assets/08fa67dc-7626-4377-b4ac-b32a1ad35368" />
This is the Dashboard

<img width="1366" height="768" alt="Home" src="https://github.com/user-attachments/assets/030db1d0-4579-4e13-bf84-60b4b1468198" />
The Home page

<img width="1366" height="768" alt="Transaction" src="https://github.com/user-attachments/assets/1c09a477-8bbc-46dc-8496-30876532f013" />
This is the transaction page


<img width="1366" height="768" alt="Account settings" src="https://github.com/user-attachments/assets/33c4416b-3962-43f6-b1de-ca47db5b3c0b" />
This is the account settings page
-----

# To Login

Enter default email and password

# To make transactions in the Dashboard Page

Use the Test Fund Transfer form below, enter the necessary details, select currencies and click on the execute transfer button, a record of the most recent transactions will be displayed in the homepage, and more details in the transaction page.

In the Dashboard page there is a dropdown for all available currencies which shows the live exchange rates for each currency, you can choose any to check.

# To Logout

Click on the Logout icon at the bottom part of the settings page, you will be logged out and redirected to the login page
