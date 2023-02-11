const express = require('express');
const { readTalkerFile, getTalkerLastId,
        insertTalkerFile, changeTalkerFile, deleteTalker,
         searchByName } = require('./utils/readAndWriteFiles');
const generateToken = require('./utils/genereteToken');
const { validateLogin } = require('./middlewares/validateLogin');
const { validateAge,
        validateName, validateTalk, validateAgeInteger,
        validateToken, validateWatchedAt,
        validateRate, 
         } = require('./middlewares/valuesValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await searchByName(q);
  res.status(200).json(talkers);
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkerFile();
  if (talkers) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerFile();
  const { id } = req.params;
  const speaker = talkers.find((e) => e.id === Number(id));
  
  if (!speaker) {
      const message = {
          message: 'Pessoa palestrante não encontrada',
      };
    return res.status(404).json(message);
  }
  
  return res.status(200).json(speaker);
});

app.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker',
    validateToken,
    validateAge,
    validateAgeInteger,
    validateName, 
    validateTalk,
    validateRate,
    validateWatchedAt,
    async (req, res) => {
      const talker = req.body;
      const lastIdTalker = await getTalkerLastId();
      const saveTalker = { id: lastIdTalker + 1, ...talker };
      await insertTalkerFile(saveTalker);
      res.status(201).json(saveTalker);
  });

app.put('/talker/:id', 
validateToken,
    validateAge,
    validateAgeInteger,
    validateName, 
    validateTalk,
    validateRate,
    validateWatchedAt,
    async (req, res) => {
      const { id } = req.params;
      const talker = req.body;
      const changeTalker = await changeTalkerFile({ id, talker });
      res.status(200).json(changeTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
 await deleteTalker(id);
 res.status(204).json({});
});
