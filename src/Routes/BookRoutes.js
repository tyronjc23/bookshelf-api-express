const express = require('express');
const BookController = require('../Controllers/BookController');

const routes = express.Router();

routes.get('/', BookController.getAllBooks);
routes.get('/:id', BookController.getBookById);
routes.post('/', BookController.addBooks);
routes.put('/:id', BookController.editBookById);
routes.delete('/:id', BookController.deleteBookById);

module.exports = routes;
