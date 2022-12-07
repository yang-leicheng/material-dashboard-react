import Fetch from "./fetch";

export const login = async (options) => {
  const result = await Fetch("api/login", options, "post");
  return result;
};
