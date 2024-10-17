const express = require('express');
const router = express.Router();
const {
    createComicBook,
    getAllComicBooks,
    getComicBookById,
    updateComicBook,
    deleteComicBook
  } = require('../controllers/comicBookController');
  
// Create comic book
router.post('/', createComicBook);

// Get all comic books
router.get('/', getAllComicBooks);

// Get a comic book by ID
router.get('/:id', getComicBookById);

// Update a comic book by ID
router.put('/:id', updateComicBook);

// Delete a comic book by ID
router.delete('/:id', deleteComicBook);

module.exports = router;
