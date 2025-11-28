const prisma = require('../config/database');

class TaskService {
  async getAllTasks(filters = {}) {
    const where = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.employeeId) {
      where.employeeId = filters.employeeId;
    }

    return await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    });
  }

  async getTaskById(id) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async createTask(data) {
    // If employeeId is provided, verify employee exists
    if (data.employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: data.employeeId },
      });

      if (!employee) {
        throw new Error('Employee not found');
      }
    }

    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: data.status || 'PENDING',
        employeeId: data.employeeId || null,
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    });
  }

  async updateTask(id, data) {
    // Check if task exists
    await this.getTaskById(id);

    // If employeeId is being updated, verify employee exists
    if (data.employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: data.employeeId },
      });

      if (!employee) {
        throw new Error('Employee not found');
      }
    }

    return await prisma.task.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.employeeId !== undefined && { employeeId: data.employeeId }),
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteTask(id) {
    // Check if task exists
    await this.getTaskById(id);

    return await prisma.task.delete({
      where: { id },
    });
  }
}

module.exports = new TaskService();

