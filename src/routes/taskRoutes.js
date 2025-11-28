const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  validateTask,
  validateTaskId,
  validateTaskFilters,
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (with optional filters)
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', validateTaskFilters, taskController.getAllTasks.bind(taskController));

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get('/:id', validateTaskId, taskController.getTaskById.bind(taskController));

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *               employeeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created
 *       404:
 *         description: Assigned employee not found
 */
router.post(
  '/',
  // authenticateToken, // optional
  validateTask,
  taskController.createTask.bind(taskController)
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *               employeeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task or employee not found
 */
router.put(
  '/:id',
  // authenticateToken,
  validateTaskId,
  validateTask,
  taskController.updateTask.bind(taskController)
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete(
  '/:id',
  // authenticateToken,
  validateTaskId,
  taskController.deleteTask.bind(taskController)
);

module.exports = router;
