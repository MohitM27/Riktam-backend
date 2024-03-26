exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin && req.user.isAdmin) {
    next();
  } else {
    return res.sendStatus(403);
  }
};
