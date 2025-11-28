const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create employees
  const employee1 = await prisma.employee.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      role: 'Software Developer',
      email: 'john.doe@example.com',
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      role: 'Project Manager',
      email: 'jane.smith@example.com',
    },
  });

  const employee3 = await prisma.employee.upsert({
    where: { email: 'bob.johnson@example.com' },
    update: {},
    create: {
      name: 'Bob Johnson',
      role: 'QA Engineer',
      email: 'bob.johnson@example.com',
    },
  });

  // Create tasks
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication to the API',
      status: 'IN_PROGRESS',
      employeeId: employee1.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Design database schema',
      description: 'Create ERD and implement database migrations',
      status: 'COMPLETED',
      employeeId: employee2.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Write API documentation',
      description: 'Document all endpoints with examples',
      status: 'PENDING',
      employeeId: employee1.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      status: 'PENDING',
      employeeId: null, // Unassigned task
    },
  });

  await prisma.task.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Perform security audit',
      description: 'Review code for security vulnerabilities',
      status: 'IN_PROGRESS',
      employeeId: employee3.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

