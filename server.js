const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const mongodb = require("./DB/database");
const { isAuthenticated } = require("./middleware/authenticate");

dotenv.config();

const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the public directory
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with GitHub strategy
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register route with authentication
app.use("/student", isAuthenticated, require("./routes/student"));
app.use("/grade", isAuthenticated, require("./routes/grade"));

// Login route
app.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback route
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Profile route
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      `Hello, ${req.user.displayName}! Welcome to your student database.`
    );
  } else {
    res.redirect("/login");
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.redirect("/"); // Redirect to the home page
    });
  });
});

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Database!");
});

// Initialize the database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  } else {
    console.log("Database initialized successfully!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(
        `Swagger API Docs available at http://localhost:${port}/api-docs`
      );
    });
  }
});
