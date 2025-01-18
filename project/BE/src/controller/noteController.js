import Note from '../models/noteModel.js';

const createNote = async (req, res) => {
  const { content } = req.body;

  try {
    const newNote = new Note({
      content,
      userId: req.userId,
    });

    await newNote.save();
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// Get all notes for a logged-in user
const getNotes = async (req, res) => {
  const userId = req.userId;  // Access the userId from the JWT token (set by middleware)

  try {
    const notes = await Note.find({ userId });  // Find notes that belong to the logged-in user
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

export { createNote, getNotes };
