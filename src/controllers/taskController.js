const taskService = require('../services/taskService');

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const filters = {};
      if (req.query.status) {
        filters.status = req.query.status;
      }
      if (req.query.employeeId) {
        filters.employeeId = parseInt(req.query.employeeId);
      }

      const tasks = await taskService.getAllTasks(filters);
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
        filters: Object.keys(filters).length > 0 ? filters : null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      if (error.message === 'Task not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
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

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(
        parseInt(req.params.id),
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      if (error.message === 'Task not found' || error.message === 'Employee not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(parseInt(req.params.id));
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      if (error.message === 'Task not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }
}

module.exports = new TaskController();

