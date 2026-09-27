import Book from "../models/Book.js";
import Issue from "../models/Issue.js";
import User from "../models/User.js";
import { calculateFine } from "../utils/calculateFine.js";

export const issueBook = async ({ bookId, memberId, days = 14 }) => {
  const book = await Book.findById(bookId);

  const member = await User.findById(memberId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!member || member.role !== "member") {
    throw new Error("Member not found");
  }

  if (book.availableCopies <= 0) {
    throw new Error("No copies available");
  }

  const existingIssue = await Issue.findOne({
    book: bookId,
    member: memberId,
    status: "issued",
  });

  if (existingIssue) {
    throw new Error("This member already has this book");
  }

  const issueDate = new Date();

  const dueDate = new Date(issueDate);

  dueDate.setDate(dueDate.getDate() + Number(days));

  const issue = await Issue.create({
    book: bookId,
    member: memberId,
    issueDate,
    dueDate,
    status: "issued",
    fine: 0,
  });

  book.availableCopies -= 1;

  await book.save();

  return issue.populate("book member", "title author name email");
};

export const returnBook = async (issueId) => {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new Error("Issue record not found");
  }

  if (issue.status === "returned") {
    throw new Error("Book already returned");
  }

  const returnDate = new Date();

  issue.returnDate = returnDate;

  issue.status = "returned";

  issue.fine = calculateFine(issue.dueDate, returnDate);

  const book = await Book.findById(issue.book);

  if (book) {
    book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);

    await book.save();
  }

  await issue.save();

  return issue.populate("book member", "title author name email");
};

export const getIssues = async (user) => {
  const filter =
    user.role === "admin"
      ? {}
      : {
          member: user._id,
        };

  return Issue.find(filter)
    .populate("book", "title author ISBN")
    .populate("member", "name email")
    .sort({
      createdAt: -1,
    });
};

export const getMembers = async () => {
  return User.find({
    role: "member",
  })
    .select("-password")
    .sort({
      createdAt: -1,
    });
};
