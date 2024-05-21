import Course from "../models/course.model.js";

export const create = async (req, res) => {
    const { courseName, coursePrice, courseDescription, courseDuration} = req.body;
  
    try {
        const newCourse = new Course({
           
            courseName,
            coursePrice,
            courseDescription,
            courseDuration
        });
  
        const savedCourse = await newCourse.save();
  
        res.status(201).json({
            message: "created successfully!",
            data: savedCourse
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating new employee",
            error: error.message
        });
    }
  }
  
export const getCourse = async (req, res) => {
    try {
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
  
      const query = {};
  
      if (req.query.courseName) {
          query.courseName = req.query.courseName;
      }
      if (req.query.courseId) {
          query._id = req.query.courseId;
      }
  
      const course = await Course.find(query).sort({ updatedAt: sortDirection });
  
      res.status(200).json(course);
  } catch (error) {
      next(error);
  }
}
  
export const updateCourse = async (req, res) => {
    try {
      const {  courseName, coursePrice, courseDescription, courseDuration } = req.body;
  
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
          $set: {
            
            courseName,
            coursePrice,
            courseDescription,
            courseDuration
          }
      }, { new: true }); 
  
      res.status(200).json({ message: 'updated successfully', updatedCourse });
  } catch (error) {
      next(error);
  }
}
  
export const deleteCourse = async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Course has been deleted' });
      
    } catch (error) {
      next(error)
    }
}