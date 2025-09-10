// 代码生成时间: 2025-09-10 15:47:16
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Dummy data for demonstration purposes
const sampleData = [
  { name: 'John', age: 30, salary: 50000 },
  { name: 'Jane', age: 25, salary: 48000 },
  { name: 'Doe', age: 40, salary: 70000 }
];

// Route to calculate average salary
app.get('/api/average-salary', (req, res) => {
  try {
    const totalSalary = sampleData.reduce((acc, person) => acc + person.salary, 0);
    const averageSalary = totalSalary / sampleData.length;
    res.json({ averageSalary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate average salary' });
  }
});

// Route to get the total number of entries
app.get('/api/data-count', (req, res) => {
  res.json({ count: sampleData.length });
});

// Route to get the oldest person
app.get('/api/oldest-person', (req, res) => {
  const oldest = sampleData.sort((a, b) => b.age - a.age)[0];
  res.json(oldest);
});

// Start the server
app.listen(port, () => {
  console.log(`Data Analysis App listening at http://localhost:${port}`);
});
