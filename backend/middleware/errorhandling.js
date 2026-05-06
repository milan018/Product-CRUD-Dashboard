const errorhandling = (err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};
export default errorhandling;
