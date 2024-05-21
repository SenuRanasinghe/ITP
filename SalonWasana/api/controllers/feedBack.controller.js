import FeedBack from "../models/feedBack.model.js";


export const create = async (req, res) => {
    const { Email,Service,Feedback,ProductID,UserID,userName} = req.body;
  
    try {
        const newFeedback = new FeedBack({
            Email,
            Service,
            Feedback,
            ProductID,
            UserID,
            userName
        });
  
        const savedFeedback = await newFeedback.save();
  
        res.status(201).json({
            message: "Employee created successfully!",
            data: savedFeedback
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating new employee",
            error: error.message
        });
    }
}
  
export const getFeedBack = async (req, res) => {
    try {
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
  
      const query = {};
  
      if (req.query.UserID) {
          query.UserID = req.query.UserID;
      }


      if (req.query.Email) {
          query.Email = req.query.Email;
      }
      
      if (req.query.feedbackId) {
          query._id = req.query.feedbackId;
      }
  
      const feedback = await FeedBack.find(query).sort({ updatedAt: sortDirection });
  
      res.status(200).json(feedback);
  } catch (error) {
      next(error);
  }
}
  
export const updateFeedBack = async (req, res) => {
    try {
      const { Email,Service,Feedback } = req.body;
  
      const updatedFeedback = await FeedBack.findByIdAndUpdate(req.params.id, {
          $set: {
            Email,
            Service,
            Feedback
          }
      }, { new: true }); 
  
      res.status(200).json({ message: 'updated successfully', updatedFeedback });
  } catch (error) {
      next(error);
  }
}
  
export const deleteFeedBack = async (req, res) => {
    try {
      await FeedBack.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Employee has been deleted' });
      
    } catch (error) {
      next(error)
    }
}