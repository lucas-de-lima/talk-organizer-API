const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const arrayPosts = await fs.readFile('src/talker.json', 'utf8');

    return JSON.parse(arrayPosts);
  } catch (error) {
    return null;
  }
};

const getTalkerLastId = async () => {
  const arrayPosts = await readTalkerFile();
  return arrayPosts[0];
};

const insertTalkerFile = async (post) => {
  try {
    const arrayPosts = await readTalkerFile();
    arrayPosts.push(post);
    arrayPosts[0] += 1;

    return await fs.writeFile('src/talker.json', JSON.stringify(arrayPosts));
  } catch (error) {
    return null;
  }
};

const changeTalkerFile = async (post, id) => {
  try {
    const arrayPosts = await readTalkerFile();
    let changedPost;

    for (let i = 0; i < arrayPosts.length; i += 1) {
      if (arrayPosts[i].id === Number(id)) {
        arrayPosts[i].title = post.title;
        arrayPosts[i].description = post.description;
        arrayPosts[i].updatedAt = post.updatedAt;
        changedPost = arrayPosts[i];
      }
    }
    
    await fs.writeFile('src/talker.json', JSON.stringify(arrayPosts));
    return changedPost;
  } catch (error) {
    return null;
  }
};

module.exports = {
  readTalkerFile,
  getTalkerLastId,
  insertTalkerFile,
  changeTalkerFile,
};