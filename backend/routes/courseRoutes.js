const express = require('express');
const {validateToken} = require('../helper/jwt');
const { createCourse , getCourseByUserId  , deleteCourse , updateCourse , updateCourseWithStd,} = require('../controller/CourseController')
const routes = express.Router()
// Courses All Routes
routes.post('/', validateToken , createCourse)
routes.get('/', validateToken , getCourseByUserId)
routes.delete('/:id',validateToken ,  deleteCourse)
routes.patch('/:id', validateToken ,  updateCourse)
routes.patch('/std/:id', validateToken ,  updateCourseWithStd)

module.exports = routes