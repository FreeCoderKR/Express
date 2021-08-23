export const wrap = (handler) => async (req, res, next) => {
  try {
    const response = await handler(req, res, next);
    const reply = {
      success: true,
      response: response,
      error: null,
    };
    res.json(reply);
    next();
  } catch (err) {
    const reply = {
      success: false,
      response: null,
      error: {
        status: err.status,
        message: err.message,
      },
    };
    res.json(reply);
    next();
    // next(err);
  }
};
