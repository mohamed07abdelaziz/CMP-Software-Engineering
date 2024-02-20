const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => 
{
   employeeId = req.params.id; 

   id = req.params.id
   index = employee.findIndex(emp => emp.id === employeeId);

  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};
// TODO
exports.createEmployee = async (req, res, next) => {
  let { id, name } = req.body;

  
  if (!id || !name) {
    

    return res.status(400).json({ message: 'Please insert both ID and name for the employee' });
  }

  // let z=name.CharAt(0);
  // if ( z>= 'A' && z <= 'Z')
  //     x = true;

  // if (z >= 'a' && z <= 'z')
  //   y = true;

    // alert(x)
    // alert(y)
    // if (!x || !y) 
    // {
      
    //   return res.status(404).json({ message: 'wrong user name' });
    // }

   existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {  // 409 falid http req as this id is already eixist
    return res.status(409).json({ message: 'Employee with this ID already exists' });
  }

  employee.push({ id, name });  // 201 succe creatre req
  res.status(201).json({ message: 'Employee created successfully' });
};
