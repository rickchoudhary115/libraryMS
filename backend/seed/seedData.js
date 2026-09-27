import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Book from "../models/Book.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");

    // Create admin
    const existingAdmin = await User.findOne({
      email: "admin@library.com",
    });

    if (!existingAdmin) {
      await User.create({
        name: "Library Admin",
        email: "admin@library.com",
        password: "admin123",
        role: "admin",
      });

      console.log("Admin created");
    }

    // Create books
    const bookCount = await Book.countDocuments();

    if (bookCount === 0) {
      await Book.insertMany([
        {
          title: "Clean Code",
          author: "Robert C. Martin",
          ISBN: "9780132350884",
          category: "Programming",
          description: "A guide to writing clean and maintainable code.",
          totalCopies: 5,
          availableCopies: 5,
        },

        {
          title: "Introduction to Algorithms",
          author: "Thomas H. Cormen",
          ISBN: "9780262046305",
          category: "Algorithms",
          description: "A comprehensive algorithms textbook.",
          totalCopies: 4,
          availableCopies: 4,
        },

        {
          title: "The Pragmatic Programmer",
          author: "Andrew Hunt",
          ISBN: "9780135957059",
          category: "Programming",
          description: "Practical software development principles.",
          totalCopies: 3,
          availableCopies: 3,
        },
      ]);

      console.log("Books created");
    }

    console.log("Seed completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    process.exit(1);
  }
};

seed();
