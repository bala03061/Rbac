// const Employee = require('../Models/Employee');
// const jwt = require('jsonwebtoken');

// // Add Employee
// const addEmployee = async (req, res) => {
//   try {
//     const { name, employeeId, username, password, role } = req.body;
//     const employee = new Employee({ name, employeeId, username, password, role });
//     await employee.save();
//     res.status(201).json({ message: 'Employee added successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Login Employee
// const loginEmployee = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const employee = await Employee.findOne({ username });
//     if (!employee || !(await bcrypt.compare(password, employee.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });
//     res.status(200).json({ token, role: employee.role });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { addEmployee, loginEmployee };
