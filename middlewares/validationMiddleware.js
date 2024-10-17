const { check, validationResult } = require('express-validator');

const comicBookValidation = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('publisher').notEmpty().withMessage('publisher is required'),
    check('issueNumber').notEmpty().withMessage('issueNumber is required'),
    check('price').notEmpty().withMessage('price is required'),
    check('stock').notEmpty().withMessage('stock is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('coverImage').notEmpty().withMessage('coverImage is required'), 
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { comicBookValidation, validate };
