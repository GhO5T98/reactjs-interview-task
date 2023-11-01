# Notes App

A Full Stack MERN web application that help users to store and modify they notes.

## Features

- User Registration and Login with JWT Authentication: Securely sign up and log in to the MERN Notes App with JWT (JSON Web Token) authentication for enhanced user privacy and data protection.
-  Stay organized by creating and managing an unlimited number of categories to categorize and group your notes in a structured manner.
- There's no limit to the number of notes you can create within each category, allowing you to document your thoughts, ideas, and information without restrictions.
- Safely log out from the MERN Notes App to secure your account and data, providing an extra layer of protection when you're not actively using the application.

## Technologies Used

- React.js: Frontend library.
- Joy UI: UI framework for styling and components.
- MongoDB: Database to store users, categories, and notes.
- Express.js: Backend framework to handle API requests.
- Node.js: Runtime environment for executing JavaScript server-side.
- Axios: Promise based HTTP client for the browser and Node.js.
- React Router: For managing routes in the React application.
- JWT (JSON Web Tokens): For secure user authentication.
- React Toast: For displaying notifications.

## Getting Started

### Prerequisites

- Make sure you have `Node.js` and `MongoDB` installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone 
```

2. For the front-end , navigate to the client directory and install the necessary npm packages for the frontend:

```bash
cd [your repository name]/client
npm install
```

3. To run the frontend:

```bash
npm start
```

4. For the back-end , navigate to the server directory and install the necessary npm packages for the back-end:

```bash
cd [your repository name]/server
npm install
```

5. To run the frontend:

```bash
npm start
```
## Usage

1. Open the application in your browser, at `http://localhost:3000`.
2. Register as a new user or login if you've already registered.
3. Start creating categories and adding notes inside them. 
4. Logout from the application when done.

## Screenshots

Here's a look at the application:

| ![Screenshot 1](/Notes%20App/screenshots/Screenshot-1.png)| ![Screenshot 2](/Notes%20App/screenshots/Screenshot-2.png) |
| ---------------------------------- | ---------------------------------- |
| ![Screenshot 3](/Notes%20App/screenshots/Screenshot-3.png) | ![Screenshot 4](/Notes%20App/screenshots/Screenshot-4.png) |
| ![Screenshot 5](/Notes%20App/screenshots/Screenshot-5.png) | ![Screenshot 6](/Notes%20App/screenshots/Screenshot-6.png) |
| ![Screenshot 7](/Notes%20App/screenshots/Screenshot-7.png) | ![Screenshot 8](/Notes%20App/screenshots/Screenshot-8.png) |
| ![Screenshot 9](/Notes%20App/screenshots/Screenshot-9.png) |

## Enhancements & Scalability

### Security Enhancements

1. **Input Validation and Sanitization**:Implement input validation and sanitization on both the client and server sides. This prevents malicious input, such as SQL injection or cross-site scripting (XSS) attacks.
3. **HTTPS**:Use HTTPS to encrypt data in transit. Obtain an SSL/TLS certificate for your domain to ensure that data transferred between the client and server is secure and cannot be intercepted by attackers.
5. **API Rate Limiting**:Implement rate limiting on your API to protect against abuse and denial-of-service attacks. Define appropriate rate limits for different types of requests.
6. **Keep Software Updated**: Ensure that your server, database, and all software components are kept up-to-date with security patches and updates.

### Scalability Strategies

1. **Database Optimization**: Normalize and structure your data in a way that reduces redundancy and minimizes data retrieval times.
2. **Caching**: Use in-memory caching solutions like Redis to cache frequently accessed data, reducing the load on your database for read-heavy operations.
3. **Load Balancers**: Implement load balancing to distribute incoming traffic across multiple Node.js server instances.
4. **Client-Side Caching**:  Implement client-side caching to reduce the number of requests to the server. Service workers can help with this.
5. **Lazy Loading**:  Implement lazy loading for resources such as images and components to improve the initial page load time.
6. **Content Delivery Network (CDN)**: Utilize a Content Delivery Network (CDN) to distribute static assets (e.g., images, CSS, and JavaScript) to reduce latency and speed up content delivery.

