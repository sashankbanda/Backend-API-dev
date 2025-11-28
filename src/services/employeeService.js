const prisma = require('../config/database');

class EmployeeService {
  async getAllEmployees() {
    return await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    });
  }

  async getEmployeeById(id) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async createEmployee(data) {
    // Check if email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: data.email },
    });

    if (existingEmployee) {
      throw new Error('Employee with this email already exists');
    }

    return await prisma.employee.create({
      data: {
        name: data.name,
        role: data.role,
        email: data.email,
      },
    });
  }

  async updateEmployee(id, data) {
    // Check if employee exists
    await this.getEmployeeById(id);

    // If email is being updated, check for duplicates
    if (data.email) {
      const existingEmployee = await prisma.employee.findUnique({
        where: { email: data.email },
      });

      if (existingEmployee && existingEmployee.id !== id) {
        throw new Error('Employee with this email already exists');
      }
    }

    return await prisma.employee.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.role && { role: data.role }),
        ...(data.email && { email: data.email }),
      },
    });
  }

  async deleteEmployee(id) {
    // Check if employee exists
    await this.getEmployeeById(id);

    // Delete employee (tasks will have employeeId set to null due to onDelete: SetNull)
    return await prisma.employee.delete({
      where: { id },
    });
  }
}

module.exports = new EmployeeService();

