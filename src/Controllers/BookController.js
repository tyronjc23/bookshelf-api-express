/* eslint-disable eqeqeq */
const { nanoid } = require('nanoid');
const books = require('../Models/books');

const getAllBooks = (req, res) => {
  const { name, reading, finished } = req.query;
  let result = [];

  if (Object.keys(req.query).length === 0) {
    result = books;
  } else {
    if (name !== undefined) {
      const pattern = new RegExp(name, 'i');
      result = books.filter((book) => book.name.match(pattern));
    }

    if (reading !== undefined) {
      switch (reading) {
        case '1':
        case 1:
        case true:
          result = books.filter((n) => n.reading === true);
          break;

        case '0':
        case 0:
        case false:
          result = books.filter((n) => n.reading === false);
          break;

        default:
          result = books;
          break;
      }
    }

    if (finished !== undefined) {
      switch (finished) {
        case '1':
        case 1:
        case true:
          result = books.filter((book) => book.finished == true);
          break;

        case '0':
        case 0:
        case false:
          result = books.filter((book) => book.finished == false);
          break;

        default:
          result = books;
          break;
      }
    }
  }

  result = result.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  res.status(200).json({
    status: 'success',
    data: {
      books: result,
    },
  });
};

const addBooks = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  try {
    if (name === undefined) {
      const responseData = {
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
        statusCode: 400,
      };
      throw responseData;
    }

    if (readPage > pageCount) {
      const responseData = {
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
      };
      throw responseData;
    }

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
      const responseData = {
        status: 'fail',
        message: 'Buku gagal ditambahkan',
        statusCode: 500,
      };
      throw responseData;
    }
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book === undefined) {
    res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    return;
  }

  res.json({
    status: 'success',
    data: {
      book,
    },
  });
};

const editBookById = (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const index = books.findIndex((book) => book.id === id);

  try {
    if (index === -1) {
      const responseData = {
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
        statusCode: 404,
      };
      throw responseData;
    }

    if (name === undefined) {
      const responseData = {
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        statusCode: 400,
      };
      throw responseData;
    }

    if (readPage > pageCount) {
      const responseData = {
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
      };
      throw responseData;
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookById = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    return;
  }

  res.status(404).json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
};

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
