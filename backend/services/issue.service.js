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

export const requestBook = async ({ bookId, memberId }) => {
  const book = await Book.findById(bookId);

  const member = await User.findById(memberId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!member || member.role !== "member") {
    throw new Error("Member not found");
  }

  // Check availability
  if (book.availableCopies <= 0) {
    throw new Error("No copies available");
  }

  // Already issued
  const existingIssue = await Issue.findOne({
    book: bookId,
    member: memberId,
    status: "issued",
  });

  if (existingIssue) {
    throw new Error("You already have this book");
  }

  // Already requested
  const existingRequest = await Issue.findOne({
    book: bookId,
    member: memberId,
    status: "requested",
  });

  if (existingRequest) {
    throw new Error("You have already requested this book");
  }

  // Create request
  const request = await Issue.create({
    book: bookId,
    member: memberId,
    status: "requested",
    issueDate: null,
    dueDate: null,
    returnDate: null,
    fine: 0,
  });

  return request.populate("book member", "title author name email");
};

export const approveIssueRequest = async (issueId) => {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new Error("Issue request not found");
  }

  if (issue.status !== "requested") {
    throw new Error("This request has already been processed");
  }

  const book = await Book.findById(issue.book);

  if (!book) {
    throw new Error("Book not found");
  }

  // Check availability again.
  // A book could have become unavailable
  // after the member submitted the request.
  if (book.availableCopies <= 0) {
    throw new Error("No copies available for this request");
  }

  const issueDate = new Date();

  const dueDate = new Date(issueDate);

  // Default borrowing period = 14 days
  dueDate.setDate(dueDate.getDate() + 14);

  issue.issueDate = issueDate;
  issue.dueDate = dueDate;
  issue.status = "issued";
  issue.fine = 0;

  book.availableCopies -= 1;

  await book.save();
  await issue.save();

  return issue.populate("book member", "title author name email");
};


export const rejectIssueRequest = async (issueId) => {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new Error("Issue request not found");
  }

  if (issue.status !== "requested") {
    throw new Error("This request has already been processed");
  }

  issue.status = "rejected";

  await issue.save();

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

  if (issue.status !== "issued") {
    throw new Error("Only issued books can be returned");
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
