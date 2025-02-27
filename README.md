# Nodejs-Push-Notification

This project demonstrates how to build a browser push notification system using Node.js, Express, and the Web Push API. It leverages Service Workers to receive push notifications in the browser and uses the [web-push](https://www.npmjs.com/package/web-push) library on the server to send notifications.

## Features

- **Service Worker Registration:**  
  Registers a service worker to enable background processing of push events.

- **Push Subscription:**  
  Uses the Push API to subscribe the browser for push notifications.

- **VAPID Authentication:**  
  Utilizes VAPID keys to securely send notifications.

- **Express Server:**  
  Handles subscription storage and notification dispatching.

## Prerequisites

- **Node.js** (v12 or later)
- A modern browser (Chrome, Firefox, etc.) that supports Service Workers and the Push API

## Project Structure

```
project-root/
├── public/
│   ├── index.html         # Client-side HTML and JavaScript
│   └── sw.js              # Service Worker file
├── generateVapidKeys.js   # Script to generate VAPID keys
├── server.js              # Express server code
├── package.json
└── README.md
```

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate VAPID Keys

Run the following command to generate your VAPID keys:

```bash
node generateVapidKeys.js
```

This will output an object containing `publicKey` and `privateKey`. Update your code in both `server.js` and `index.html`:

- **In `server.js`:** Replace `'YOUR_PUBLIC_VAPID_KEY_HERE'` and `'YOUR_PRIVATE_VAPID_KEY_HERE'` with the generated keys.
- **In `index.html`:** Replace `'YOUR_PUBLIC_VAPID_KEY_HERE'` with your public key.

### 4. Start the Server

Run the Express server:

```bash
node server.js
```

Your server will start on `http://localhost:3000`.

### 5. Test the Application

1. Open your browser and navigate to `http://localhost:3000`.
2. Click the **"Subscribe for Notifications"** button. This will register the service worker and subscribe your browser for push notifications.
3. To send a push notification, use a tool like `curl` or Postman to send a POST request to the `/notify` endpoint:

   ```bash
   curl -X POST http://localhost:3000/notify
   ```

You should receive a push notification in your browser.

## How It Works

- **Client Side:**
  - **Service Worker Registration:**  
    The browser registers `sw.js` as a service worker.
    
  - **Subscription:**  
    The browser subscribes for push notifications using the Push API. The subscription object (including endpoint and keys) is sent to the server via the `/subscribe` endpoint.
    
  - **Handling Push Events:**  
    The service worker listens for `push` events and displays notifications using the Notifications API.

- **Server Side:**
  - **Subscription Storage:**  
    The server stores incoming subscription objects (for demo purposes, these are kept in memory; consider using a database in production).
    
  - **Sending Notifications:**  
    The `/notify` endpoint uses the `web-push` library to send notifications to all stored subscriptions using the VAPID keys for authentication.

## Production Considerations

- **HTTPS:**  
  Service Workers and push notifications require HTTPS in production environments (except on `localhost` during development).

- **Subscription Storage:**  
  Replace the in-memory storage with a database for persistent storage of subscription objects.

- **Error Handling:**  
  Enhance error handling and logging for a production-ready system.
