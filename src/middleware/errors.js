function notFoundHandler(req, res, next) {
  return res.status(404).json({ error: "Not found" });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = { notFoundHandler, errorHandler };

