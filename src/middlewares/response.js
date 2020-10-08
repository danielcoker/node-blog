const responseHandler = (req, res, next) => {
  // Only used for successful reponse.
  res.respond = function respond(status = 200, data = {}, message) {
    const response = {
      success: status < 400,
      message: message || undefined,
      data,
    };

    res.status(status).json(response);
  };

  next();
};

export default responseHandler;
