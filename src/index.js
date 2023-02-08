const express = require('express');
const { readTalkerFile, getTalkerLastId, insertTalkerFile } = require('./utils/readAndWriteFiles');
const generateToken = require('./utils/genereteToken');
const { validateLogin } = require('./middlewares/validateLogin');
const { validateAge,
        validateName, validateTalk,
        validateToken, 
        validateForm,
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
    validateAge,
    validateName, 
    validateTalk,
    validateToken,
    validateRate,
    // validateForm,
    async (req, res) => {
      const { username, password, email } = req.body;
      const { formValid,
              usernameError,
              passwordError,
              emailError } = validateForm(username, password, email);
      if (!formValid) {
        return res.status(400).json({ usernameError, passwordError, emailError });
      }
      const speaker = req.body;
      const lastIdSpeaker = getTalkerLastId();
      const saveSpeaker = { id: lastIdSpeaker + 1, ...speaker };
      await insertTalkerFile(saveSpeaker);
      res.status(201).json(saveSpeaker);
  });