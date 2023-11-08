const prisma = require('../Config/database');

const addBooks = async (newBook) => {
  const book = await prisma.book.create({
    data: newBook,
  });

  return book;
};

const getAllBooks = async () => {
  const books = await prisma.book.findMany();

  return books;
};

const getBookById = async (bookId) => {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    throw new Error('Buku tidak ditemukan');
  }

  return book;
};

const editBookById = async (bookId, updateBook) => {
  const book = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: updateBook,
  });

  if (!book) {
    throw new Error('Gagal memperbarui buku. Id tidak ditemukan');
  }

  return book;
};

const deleteBookById = async (bookId) => {
  const book = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    throw new Error('Buku gagal dihapus. Id tidak ditemukan');
  }

  return book;
};

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
