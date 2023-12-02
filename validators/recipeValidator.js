const { body, validationResult } = require('express-validator');

const validateRecipe = [
  body('id').notEmpty().withMessage('ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('image').notEmpty().withMessage('Image is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRecipe };

