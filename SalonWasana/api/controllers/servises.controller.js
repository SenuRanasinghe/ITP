import Service from '../models/services.model.js'

export const create = async (req, res) => {
    const { ServiceType,ServiceName,Description,Price,Image,DateCreated,ServiceID} = req.body;

  try {
      const newService = new Service({
        ServiceID,
        ServiceType,
        ServiceName,
        Description,
        Price,
        Image,
        DateCreated
      });

      const savedService = await newService.save();

      res.status(201).json({
          message: "created successfully!",
          data: savedService
      });
  } catch (error) {
      res.status(400).json({
          message: "Error creating new employee",
          error: error.message
      });
  }
}

export const getServises = async (req, res) => {
    try {
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
    
        const query = {};
    
        if (req.query.serviceName) {
            query.ServiceName = req.query.serviceName;
        }

        if (req.query.serviceId) {
            query._id = req.query.serviceId;
        }
    
        const services = await Service.find(query).sort({ updatedAt: sortDirection });
    
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
}

export const updateServises = async (req, res) => {
    
    try {
        const { ServiceType, ServiceName, Description, Price, Image, DateCreated,ServiceID} = req.body;
    
        const updatedService = await Service.findByIdAndUpdate(req.params.id, {
            $set: {
                ServiceID,
                ServiceType,
                ServiceName,
                Description,
                Price,
                Image,
                DateCreated
            }
        }, { new: true }); 
    
        res.status(200).json({ message: 'updated successfully', updatedService });
    } catch (error) {
        next(error);
    }
}

export const deleteServises = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Service has been deleted' });
        
      } catch (error) {
        next(error)
      }
}