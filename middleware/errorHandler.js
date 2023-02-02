const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    //will check for status code and if there is no any preset will set it to 500 which is a server error
    res.status(statusCode);
  
    res.json({
      message: err.message,
      // will check if we are in development,
      // mode we will recive the stack with the message else stack will be null
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = {
    errorHandler,
  };
  