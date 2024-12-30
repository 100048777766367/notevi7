// Controller cho Dashboard
import Note from '../models/Note.js';

// Hiển thị dashboard
export const dashboard = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.render('pages/dashboard', { notes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Thêm mới note
export const addNote = async (req, res) => {
    const { title, body } = req.body;
    try {
        const newNote = new Note({
            user: req.user.id,
            title,
            body,
        });
        await newNote.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
