const jwt = require("jsonwebtoken");
const Course = require("../model/courseSchema");
const User = require("../model/userSchema");

// Create a course (Only teachers can create)
const createCourse = async (req, res) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const userData = await User.findById(id);

    if (userData.userType === "student") {
      return res.status(403).json({ message: "Students cannot add courses" });
    }

    const newCourse = new Course({ userId: id, ...body });
    await newCourse.save();

    res.status(201).json({ message: "Course created", data: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

// Get courses based on user type
const getCourseByUserId = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await User.findById(id);

    let courses;
    if (userData.userType === "teacher") {
      // Fetch only courses created by this teacher
      courses = await Course.find({ userId: id });
    } else {
      // Fetch all courses for students
      courses = await Course.find();
    }

    res.status(200).json({ message: "Courses fetched", course: courses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err });
  }
};

//get enrolled students 
// const getCourseStudents = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params._id).populate("students", "name email");
//     console.log(course)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json({ students: course.students });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching students", error });
//   }
// };

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course", error: err });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated", course: updatedCourse });
  } catch (err) {
    res.status(500).json({ message: "Error updating course", error: err });
  }
};


const updateCourseWithStd = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already enrolled
    const isEnrolled = course.studentId.includes(req.user.id);

    if (!isEnrolled) {
      course.studentId.push(req.user.id);
      const updatedCourse = await course.save();
      console.log('updated course' , updatedCourse)

      return res.status(200).json({ message: "Course updated", course: updatedCourse });
    } else {
      return res.status(400).json({ message: "Already enrolled" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating course", error: err });
  }
};

module.exports = {
  createCourse,
  getCourseByUserId,
  deleteCourse,
  updateCourse,
  updateCourseWithStd
};
