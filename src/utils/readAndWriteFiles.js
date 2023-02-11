const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const arrayTalker = await fs.readFile('src/talker.json', 'utf8');

    return JSON.parse(arrayTalker);
  } catch (error) {
    return null;
  }
};

const getTalkerLastId = async () => {
  const arrayTalker = await readTalkerFile();
  return arrayTalker[arrayTalker.length - 1].id;
};

const insertTalkerFile = async (talker) => {
  try {
    const arrayTalker = await readTalkerFile();
    arrayTalker.push(talker);

    return await fs.writeFile('src/talker.json', JSON.stringify(arrayTalker));
  } catch (error) {
    return null;
  }
};

const changeTalkerFile = async ({ talker, id }) => {
  try {
    const arrayTalker = await readTalkerFile();
    let changedTalker;

    for (let i = 0; i < arrayTalker.length; i += 1) {
      if (arrayTalker[i].id === Number(id)) {
        arrayTalker[i].name = talker.name;
        arrayTalker[i].age = talker.age;
        arrayTalker[i].talk = talker.talk;
        changedTalker = arrayTalker[i];
      }
    }
    
    await fs.writeFile('src/talker.json', JSON.stringify(arrayTalker));
    return changedTalker;
  } catch (error) {
    return null;
  }
};

const deleteTalker = async (id) => {
  const arrayTalker = await readTalkerFile();
  const newArray = arrayTalker.filter((talker) => talker.id !== Number(id));

  await fs.writeFile('src/talker.json', JSON.stringify(newArray));
};

const searchByName = async (search) => {
  const arrayTalker = await readTalkerFile();
  console.log(arrayTalker);
  const filtredTalkers = arrayTalker.filter((talker) => talker.name.includes(search));
  return filtredTalkers;
};

module.exports = {
  readTalkerFile,
  getTalkerLastId,
  insertTalkerFile,
  changeTalkerFile,
  deleteTalker,
  searchByName,
};