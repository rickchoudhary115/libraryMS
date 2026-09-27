import { FINE_PER_DAY } from "../config/env.js";

export const calculateFine = (dueDate, returnDate = new Date()) => {
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  const difference = returned.getTime() - due.getTime();

  if (difference <= 0) {
    return 0;
  }

  const lateDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return lateDays * FINE_PER_DAY;
};
