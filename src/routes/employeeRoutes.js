const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {
  validateEmployee,
  validateEmployeeId,
} = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get('/', employeeController.getAllEmployees.bind(employeeController));

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */
router.get('/:id', validateEmployeeId, employeeController.getEmployeeById.bind(employeeController));

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, role, email]
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 *       400:
 *         description: Validation error or duplicate email
 */
router.post('/', validateEmployee, employeeController.createEmployee.bind(employeeController));

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee details
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
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
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated
 *       404:
 *         description: Employee not found
 */
router.put('/:id', validateEmployeeId, validateEmployee, employeeController.updateEmployee.bind(employeeController));

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 */
router.delete('/:id', validateEmployeeId, employeeController.deleteEmployee.bind(employeeController));

module.exports = router;
