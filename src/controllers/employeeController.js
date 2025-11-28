const employeeService = require('../services/employeeService');

class EmployeeController {
  async getAllEmployees(req, res, next) {
    try {
      const employees = await employeeService.getAllEmployees();
      res.status(200).json({
        success: true,
        data: employees,
        count: employees.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEmployeeById(req, res, next) {
    try {
      const employee = await employeeService.getEmployeeById(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async createEmployee(req, res, next) {
    try {
      const employee = await employeeService.createEmployee(req.body);
      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: employee,
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const employee = await employeeService.updateEmployee(
        parseInt(req.params.id),
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        data: employee,
      });
    } catch (error) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      if (error.message.includes('already exists')) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      await employeeService.deleteEmployee(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }
}

module.exports = new EmployeeController();

