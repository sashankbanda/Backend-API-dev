const { body, param, query, validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Employee validation rules
const validateEmployee = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  handleValidationErrors,
];

const validateEmployeeId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Employee ID must be a positive integer'),
  handleValidationErrors,
];

// Task validation rules
const validateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Status must be one of: PENDING, IN_PROGRESS, COMPLETED'),
  body('employeeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Employee ID must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

const validateTaskId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer'),
  handleValidationErrors,
];

const validateTaskFilters = [
  query('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Status must be one of: PENDING, IN_PROGRESS, COMPLETED'),
  query('employeeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Employee ID must be a positive integer')
    .toInt(),
  handleValidationErrors,
];

module.exports = {
  validateEmployee,
  validateEmployeeId,
  validateTask,
  validateTaskId,
  validateTaskFilters,
};

