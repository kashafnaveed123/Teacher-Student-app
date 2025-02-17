const express = require('express')
const { validateToken } = require('../helper/jwt')
const { getUser, createUser, deleteUser, updateUser , loginUser , getOneUser } = require('../controller/userController')
const routes = express.Router()

routes.post('/' , createUser)
routes.post('/' , createUser)
routes.post('/loginUser' , loginUser)
routes.get('/' , validateToken, getUser)
routes.get('/me' , validateToken, getOneUser)
routes.delete('/:id' , validateToken,  deleteUser)
routes.patch('/:id' , validateToken,  updateUser)


module.exports = routes 