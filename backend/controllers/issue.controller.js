import {
  issueBook,
  returnBook,
  getIssues,
  getMembers,
} from "../services/issue.service.js";

export const createIssue = async (req, res, next) => {
  try {
    const issue = await issueBook(req.body);

    res.status(201).json(issue);
  } catch (error) {
    next(error);
  }
};

export const returnIssuedBook = async (req, res, next) => {
  try {
    const issue = await returnBook(req.params.id);

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

export const listIssues = async (req, res, next) => {
  try {
    const issues = await getIssues(req.user);

    res.json(issues);
  } catch (error) {
    next(error);
  }
};

export const listMembers = async (req, res, next) => {
  try {
    const members = await getMembers();

    res.json(members);
  } catch (error) {
    next(error);
  }
};
