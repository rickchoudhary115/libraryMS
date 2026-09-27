import Book from "../models/Book.js";
import User from "../models/User.js";
import Issue from "../models/Issue.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [books, members, issued, returned] = await Promise.all([
      Book.countDocuments(),

      User.countDocuments({
        role: "member",
      }),

      Issue.countDocuments({
        status: "issued",
      }),

      Issue.countDocuments({
        status: "returned",
      }),
    ]);

    const fineResult = await Issue.aggregate([
      {
        $group: {
          _id: null,
          totalFine: {
            $sum: "$fine",
          },
        },
      },
    ]);

    res.json({
      books,

      members,

      issued,

      returned,

      totalFines: fineResult[0]?.totalFine || 0,
    });
  } catch (error) {
    next(error);
  }
};
