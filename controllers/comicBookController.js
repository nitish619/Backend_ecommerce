const ComicBook = require('../models/comicBooks.js');

// Create a comic book
const createComicBook = async (req, res) => {
  try {
    const { title, author, publisher, issueNumber, price, stock, description, coverImage } = req.body;

    const comicBook = new ComicBook({
      title,
      author,
      publisher,
      issueNumber,
      price,
      stock,
      description,
      coverImage
    });

    const createdComicBook = await comicBook.save();
    res.status(201).json(createdComicBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all comic books
const getAllComicBooks = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size
    const page = parseInt(req.query.page) || 1;          // Default page number

    // Filters
    const queryObject = {};
    if (req.query.author) queryObject.author = req.query.author;
    if (req.query.year) queryObject.year = req.query.year;
    if (req.query.price) queryObject.price = { $lte: req.query.price }; // Filter by price less than or equal
    if (req.query.condition) queryObject.condition = req.query.condition;
    console.log('Query Object:', queryObject);

    // Sorting
    let sortBy = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy.split(':')[0]; // e.g., 'price'
      const sortOrder = req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1; // Ascending/Descending
      sortBy[sortField] = sortOrder;
    } else {
      sortBy = { createdAt: -1 }; // Default sort by creation date (newest first)
    }

    
    const count = await ComicBook.countDocuments(queryObject); // Total number of documents
    const comicBooks = await ComicBook.find(queryObject)
      .sort(sortBy)
      .limit(pageSize)
      .skip(pageSize * (page - 1)); // Pagination logic

    res.status(200).json({
      comicBooks,
      page,
      pages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    console.error('Error fetching comic books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get a single comic book
const getComicBookById = async (req, res) => {
  try {
    const comicBook = await ComicBook.findById(req.params.id);
    if (!comicBook) return res.status(404).json({ message: 'Comic Book not found' });
    res.status(200).json(comicBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a comic book
const updateComicBook = async (req, res) => {
  try {
    const { title, author, publisher, issueNumber, price, stock, description, coverImage } = req.body;
    const updatedComicBook = await ComicBook.findByIdAndUpdate(
      req.params.id,
      { title, author, publisher, issueNumber, price, stock, description, coverImage },
      { new: true }
    );

    if (!updatedComicBook) return res.status(404).json({ message: 'Comic Book not found' });

    res.status(200).json(updatedComicBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a comic book
const deleteComicBook = async (req, res) => {
  try {
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);

    if (!comicBook) {
      return res.status(404).json({ message: 'Comic Book not found' });
    }

    res.json({ message: 'Comic Book deleted' });
  } catch (error) {
    console.error('Error deleting comic book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createComicBook,
  getAllComicBooks,
  getComicBookById,
  updateComicBook,
  deleteComicBook,
};
