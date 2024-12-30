// File khởi động của ứng dụng
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/database.js';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Khởi tạo session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Xử lý lỗi 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Khởi động ứng dụng
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
