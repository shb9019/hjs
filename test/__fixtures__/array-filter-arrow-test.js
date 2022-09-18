const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result1 = words.filter((word, index) => (word.length > 6) && (index <= 4));
console.log(result1);

const result2 = words.filter((word, index, arr) => (word.length > 6) && (index <= 4));
console.log(result2);
