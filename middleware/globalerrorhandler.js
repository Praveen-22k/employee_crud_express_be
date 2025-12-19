const globalerrorhandler = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  res.status(err.statuscode).json({
    message: err.message,
    statuscode: err.statuscode,
  });
};
module.exports = globalerrorhandler;
