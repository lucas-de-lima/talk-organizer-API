const valuesValidation = (req, res, next) => {
  const blogPost = req.body;

  const isValid = Object.values(blogPost).every(
    (property) => property.length >= 5,
  );

  if (!isValid) {
    return next({ message: 'Invalid Attributes', statusCode: 422 });
  }
  return next();
};

module.exports = valuesValidation;
