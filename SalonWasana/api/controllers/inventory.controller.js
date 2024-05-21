import Inventory from "../models/inventory.model.js";


export const create = async (req, res) => {
    const {  
        name,
        description,
        quantity,
        price,
        imageUrl,
        category,
        supplierid,
        suppliername 
    } = req.body;
  
    try {
        const newInventory = new Inventory({
            name,
            description,
            quantity,
            price,
            imageUrl,
            category,
            supplierid,
            suppliername
        });
  
        const savedInventory = await newInventory.save();
  
        res.status(201).json({
            message: "Employee created successfully!",
            data: savedInventory
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating new employee",
            error: error.message
        });
    }
}
  
export const getInventory = async (req, res) => {
    try {
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
  
      const query = {};
  
      if (req.query.name) {
          query.name = req.query.name;
      }
      if (req.query.category) {
          query.category = req.query.category;
      }
      if (req.query.inventoryId) {
          query._id = req.query.inventoryId;
      }
  
      const inventory = await Inventory.find(query).sort({ updatedAt: sortDirection });
  
      res.status(200).json(inventory);
  } catch (error) {
      next(error);
  }
}
  
export const updateInventory = async (req, res) => {
    try {
        const {  
            name,
            description,
            quantity,
            price,
            imageUrl,
            category,
            supplierid,
            suppliername 
        } = req.body;
  
      const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, {
          $set: {
            name,
            description,
            quantity,
            price,
            imageUrl,
            category,
            supplierid,
            suppliername 
          }
      }, { new: true }); 
  
      res.status(200).json({ message: 'updated successfully', updatedInventory });
  } catch (error) {
      next(error);
  }
}
  
export const deleteInventory = async (req, res) => {
    try {
      await Inventory.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Inventory has been deleted' });
      
    } catch (error) {
      next(error)
    }
}