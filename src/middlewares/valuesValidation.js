const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 30) {
    return 'Username must be no more than 30 characters long';
  }
  return null;
};
const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (password.length > 100) {
    return 'Password must be no more than 100 characters long';
  }
  return null;
};
const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!/^[\w.!#$%&'+/=?^_`{|}~-]+@\w?(?:.\w?)$/.test(email)) {
    return 'Invalid email address';
  }
  return null;
};
const validateForm = (username, password, email) => {
  const usernameError = validateUsername(username);
  const passwordError = validatePassword(password);
  const emailError = validateEmail(email);

  return {
    usernameError,
    passwordError,
    emailError,
    formValid: !usernameError && !passwordError && !emailError,
  };
};
  const validateToken = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const token = req.headers.authorization;
    if (typeof token !== 'string' || token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };
  const validateName = (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Dados não encontrados' });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (typeof name !== 'string' || name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };
  const validateRequestBody = (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Dados não encontrados' });
    }
    next();
  };
  const validateAgeField = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    next();
  };
  const validateAgeType = (req, res, next) => {
    const { age } = req.body;
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    next();
  }; 
  const validateAgeInteger = (req, res, next) => {
    const { age } = req.body;
    if (!Number.isInteger(age)) {
      return res.status(400)
        .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    }
    next();
  };
  const validateAge = (req, res, next) => {
    validateRequestBody(req, res, () => {
      validateAgeField(req, res, () => {
        validateAgeType(req, res, () => {
          validateAgeInteger(req, res, () => {
            validateToken(req, res, () => {
              const { age } = req.body;
              if (age < 18) {
                return res.status(400)
                .json({ message: 'A pessoa palestrante deve ser maior de idade' });
              }
              next();
            });
          });
        });
      });
    });
  };
  const validateTalkField = (field, value, res) => {
    if (!value) {
      return res.status(400)
      .json({ message: `O campo "${field}" é obrigatório` });
    }
  };
  const validateWatchedAt = (watchedAt, res) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
      return res
        .status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  };
  const validateRate = (rate) => {
    if (rate === undefined) {
      return { valid: false, message: 'O campo "rate" é obrigatório' };
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return { valid: false, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
    }
    return { valid: true };
  };
  
  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    validateTalkField('talk', talk, res);
    validateTalkField('watchedAt', talk.watchedAt, res);
    validateWatchedAt(talk.watchedAt, res);
    const { valid, message } = validateRate(talk.rate);
    if (!valid) {
      return res.status(400).json({ message });
    }
    next();
  };

  module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateForm,
    validateRate,
  };