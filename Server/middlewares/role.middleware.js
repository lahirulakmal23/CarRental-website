import ApiError from "../utils/ApiError.js";

// usage: authorize("owner"), authorize("owner", "admin")
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action");
    }
    next();
  };
};