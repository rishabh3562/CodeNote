const express = require('express');
const {
  createNote,
  getNotesByProject,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const router = express.Router();

router.post('/', createNote);
router.get('/project/:projectId', getNotesByProject);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
