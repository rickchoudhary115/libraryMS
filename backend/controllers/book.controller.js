import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/book.service.js";

export const listBooks = async (req, res, next) => {
  try {
    const books = await getBooks(req.query.search, req.query.category);

    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const addBook = async (req, res, next) => {
  try {
    const book = await createBook(req.body);

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const editBook = async (req, res, next) => {
  try {
    const book = await updateBook(req.params.id, req.body);

    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const removeBook = async (req, res, next) => {
  try {
    await deleteBook(req.params.id);

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
