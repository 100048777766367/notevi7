// App chính cho frontend
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(ejsLayouts); // Sử dụng layout EJS

// Thiết lập thư mục chứa tài nguyên tĩnh
app.use(express.static(path.join(__dirname, '../public')));

// Khởi tạo session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('../backend/routes/dashboard'));  // Sử dụng routes từ backend

// Bắt lỗi 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Khởi động ứng dụng
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
