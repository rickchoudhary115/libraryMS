import Book from "../models/Book.js";

export const getBooks = async (search = "", category = "") => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },

      {
        author: {
          $regex: search,
          $options: "i",
        },
      },

      {
        ISBN: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    filter.category = category;
  }

  return Book.find(filter).sort({ createdAt: -1 });
};

export const createBook = async (data) => {
  const book = await Book.create({
    title: data.title,
    author: data.author,
    ISBN: data.ISBN,
    category: data.category || "General",
    description: data.description || "",
    totalCopies: Number(data.totalCopies),
    availableCopies: Number(data.totalCopies),
  });

  return book;
};

export const updateBook = async (id, data) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  const oldTotal = book.totalCopies;

  const newTotal = Number(data.totalCopies);

  const issuedCopies = oldTotal - book.availableCopies;

  if (newTotal < issuedCopies) {
    throw new Error(
      `Total copies cannot be less than issued copies (${issuedCopies})`,
    );
  }

  book.title = data.title;
  book.author = data.author;
  book.ISBN = data.ISBN;
  book.category = data.category;
  book.description = data.description || "";

  book.totalCopies = newTotal;

  book.availableCopies = newTotal - issuedCopies;

  return book.save();
};

export const deleteBook = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies !== book.totalCopies) {
    throw new Error("Cannot delete a book while copies are issued");
  }

  await book.deleteOne();

  return true;
};
