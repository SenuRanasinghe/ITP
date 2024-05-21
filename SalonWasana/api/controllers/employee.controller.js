import EmployeeModel from "../models/employee.model.js";

export const create = async (req, res) => {
  const { EmployeeName, Email, Age, Address, ContactNumber, Description, EmployeeImage, BasicSalary } = req.body;

  try {
      const newEmployee = new EmployeeModel({
         
          EmployeeName,
          Email,
          Age,
          Address,
          ContactNumber,
          Description,
          EmployeeImage,
          BasicSalary
      });

      const savedEmployee = await newEmployee.save();

      res.status(201).json({
          message: "Employee created successfully!",
          data: savedEmployee
      });
  } catch (error) {
      res.status(400).json({
          message: "Error creating new employee",
          error: error.message
      });
  }
}

export const getEmployee = async (req, res) => {
  try {
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query = {};

    if (req.query.employeeName) {
        query.EmployeeName = req.query.employeeName;
    }
    if (req.query.employeeId) {
        query._id = req.query.employeeId;
    }

    const employee = await EmployeeModel.find(query).sort({ updatedAt: sortDirection });

    res.status(200).json(employee);


} catch (error) {
    next(error);
}
}

export const updateEmployee = async (req, res) => {
  try {
    const { EmployeeName, Email, Age, Address, ContactNumber, Description, EmployeeImage, BasicSalary } = req.body;

    const updatedemployee = await EmployeeModel.findByIdAndUpdate(req.params.id, {
        $set: {
          
          EmployeeName, 
          Email, 
          Age, 
          Address, 
          ContactNumber, 
          Description, 
          EmployeeImage,
          BasicSalary
        }
    }, { new: true }); 

    res.status(200).json({ message: 'updated successfully', updatedemployee });
} catch (error) {
    next(error);
}
}

export const deleteEmployee = async (req, res) => {
  try {
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee has been deleted' });
    
  } catch (error) {
    next(error)
  }
}