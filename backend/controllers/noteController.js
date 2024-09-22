import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotesByProject = async (req, res) => {
  try {
    const notes = await Note.find({ projectId: req.params.projectId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
