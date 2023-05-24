const CONSTANT_1 = 'abcdefghijklmnop';
const CONSTANT_2 = 'qrstuvwxyzABCDEF';
const CONSTANT_3 = 123456;

function generateToken() {
    let result = '';
    for (let i = 0; i < 8; i += 1) {
      result += CONSTANT_1[Math.floor(Math.random() * CONSTANT_1.length)];
      result += CONSTANT_2[Math.floor(Math.random() * CONSTANT_2.length)];
    }
    const randomNumbers = CONSTANT_3.toString().split('').sort(() => Math.random() - 0.5).join('');
    result = result.slice(0, 12) + randomNumbers.slice(0, 4);
    return result;
  }
  
module.exports = generateToken;