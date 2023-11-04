/* eslint-disable eqeqeq */
const bookModel = require('../Models/bookModel');

const getAllBooks = async (req, res) => {
  let books = [];

  try {
    books = await bookModel.getAllBooks();

    if (Object.keys(req.query).length !== 0) {
      const { name, reading, finished } = req.query;

      if (name !== undefined) {
        const pattern = new RegExp(name, 'i');
        books = books.filter((book) => book.name.match(pattern));
      }

      if (reading !== undefined) {
        if (reading) {
          books = books.filter((n) => n.reading === true);
        } else {
          books = books.filter((n) => n.reading === false);
        }
      }

      if (finished !== undefined) {
        if (finished) {
          books = books.filter((n) => n.finished === true);
        } else {
          books = books.filter((n) => n.finished === false);
        }
      }
    }

    books = books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    res.status(200).send({
      status: 'success',
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const addBooks = async (req, res) => {
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

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  try {
    if (name === undefined) {
      const responseData = {
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
        statusCode: 400,
      };
      throw responseData;
    }

    if (readPage > pageCount) {
      const responseData = {
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
      };
      throw responseData;
    }

    const newBook = {
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

    const book = await bookModel.addBooks(newBook);

    if (!book) {
      const responseData = {
        message: 'Buku gagal ditambahkan',
        statusCode: 500,
      };
      throw responseData;
    }

    res.status(201).send({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.id,
      },
    });
  } catch (err) {
    res.status(err.statusCode || 404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.getBookById(Number(id));

    res.send({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const editBookById = async (req, res) => {
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

  try {
    if (name === undefined) {
      const responseData = {
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        statusCode: 400,
      };
      throw responseData;
    }

    if (readPage > pageCount) {
      const responseData = {
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
      };
      throw responseData;
    }

    const updateBook = {
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

    await bookModel.editBookById(Number(id), updateBook);

    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    await bookModel.deleteBookById(Number(id));

    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch (err) {
    res.status(err.statusCode || 404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
