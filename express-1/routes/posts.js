const express = require('express');
const routes = express.Router();
const controllers = require('../controllers/postsController');

// Correctly mapped routes
routes.get('/', controllers.getPosts);  // Fetch all posts or limit by query param
routes.get('/:id', controllers.getPost);  // Fetch single post by ID
routes.post('/', controllers.createPost);
routes.put('/:id', controllers.updatePost);
routes.delete('/:id', controllers.deletePost);

module.exports = routes;
