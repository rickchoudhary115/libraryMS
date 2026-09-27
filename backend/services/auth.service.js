import User from "../models/User.js";
import  {generateToken} from "../utils/generateToken.js"

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "member",
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    token: generateToken(user._id),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    token: generateToken(user._id),
  };
};
