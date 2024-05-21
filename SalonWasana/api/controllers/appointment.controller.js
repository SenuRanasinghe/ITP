import Appointment from "../models/appointments.model.js";

export const create = async (req, res) => {
  const { name, email, service, beautician, selectedDate, time, userID } = req.body;

  try {
      // Check for overlapping appointments
      const overlappingAppointment = await Appointment.findOne({
          selectedDate: selectedDate,
          time: time,
          beautician: beautician
      });

      // If an overlapping appointment exists, send an error response
      if (overlappingAppointment) {
          return res.status(400).json({
              message: "Failed to create appointment: Time slot is already taken."
          });
      }

      // If no overlap, proceed with creating a new appointment
      const newAppointment = new Appointment({
          name,
          userID,
          email,
          service,
          beautician,
          selectedDate,
          time
      });

      const savedAppointment = await newAppointment.save();

      res.status(201).json({
          message: "Appointment created successfully!",
          data: savedAppointment
      });
  } catch (error) {
      res.status(400).json({
          message: "Error creating new appointment",
          error: error.message
      });
  }
}

  
  export const getAppointment = async (req, res) => {
    try {
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
  
      const query = {};
  
      if (req.query.name) {
          query.name = req.query.name;
      }
  
      if (req.query.userID) {
          query.userID = req.query.userID;
      }

      if (req.query.appointmentId) {
          query._id = req.query.appointmentId;
      }

  
      const appointments = await Appointment.find(query).sort({ updatedAt: sortDirection });
  
      res.status(200).json(appointments);
  } catch (error) {
      next(error);
  }
  }
  
  export const updateAppointment = async (req, res) => {
    try {
      const {  name,email,service, beautician,selectedDate,time,userID} = req.body;
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, {
          $set: {
            
            name,
            userID,
            email,
            service,
            beautician,
            selectedDate,
            time
          }
      }, { new: true }); 
  
      res.status(200).json({ message: 'updated successfully', updatedAppointment });
  } catch (error) {
      next(error);
  }
  }
  
  export const deleteAppointment = async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Employee has been deleted' });
      
    } catch (error) {
      next(error)
    }
  }