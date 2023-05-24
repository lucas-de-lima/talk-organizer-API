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

  // verifica se o nome foi informado nos dados da requisição HTTP e se tem 
  // pelo menos 3 caracteres.
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

  // verifica se o dado do campo de idade é um número inteiro.
  const validateAgeInteger = (req, res, next) => {
    const { age } = req.body;
    if (!Number.isInteger(age)) {
      return res.status(400)
        .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    }
    next();
  };

  const validateAge = (req, res, next) => {
    if (!req.body || !req.body.age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
  
    if (typeof req.body.age !== 'number') {
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
  
    if (req.body.age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    
    next();
  };
  
  const validateTalkField = (field, value, res) => {
    if (!value) {
      return res.status(400)
      .json({ message: `O campo "${field}" é obrigatório` });
    }
  };
  const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
      return res
        .status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };

  const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };
  
  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    validateTalkField('talk', talk, res);
    validateTalkField('watchedAt', talk.watchedAt, res);
    
    next();
  };

  module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateAgeInteger,
    validateTalk,
    validateRate,
    validateWatchedAt,
  };