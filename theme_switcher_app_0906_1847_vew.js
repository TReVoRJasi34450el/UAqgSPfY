// 代码生成时间: 2025-09-06 18:47:24
const express = require('express');
const session = require('express-session');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Use express-session middleware for handling sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'your_secret_key',
  cookie: { secure: 'auto' }
}));

// Set up a simple middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the default theme
let defaultTheme = 'light';

// A simple in-memory store to keep track of user theme preferences
const userThemes = {};

// Middleware to set the theme for a user
app.use((req, res, next) => {
  // Check if the theme is specified in the session
  if (req.session.theme) {
    req.theme = req.session.theme;
  } else {
    // Otherwise, check if the theme is specified in the request query
    req.theme = req.query.theme || defaultTheme;
  }
  next();
});

// Route to switch themes
app.get('/switch-theme', (req, res) => {
  try {
    // Check if a theme is provided in the query parameters
    if (!req.query.theme) {
      throw new Error('Theme is required');
    }
    
    // Update the user's theme preference in the session
    req.session.theme = req.query.theme;
    
    // Update the user's theme preference in the in-memory store
    userThemes[req.sessionID] = req.query.theme;

    // Redirect back to the home page with the new theme
    return res.redirect('/');
  } catch (error) {
    // Handle any errors that occur during the theme switching process
    console.error(error);
    return res.status(400).send('Error switching theme: ' + error.message);
  }
});

// Home route that displays the current theme
app.get('/', (req, res) => {
  res.send(`Current theme is: ${req.theme}`);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
