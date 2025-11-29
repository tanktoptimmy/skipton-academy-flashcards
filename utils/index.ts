/**
 * Generates an array of random numbers.
 * @param {number} count - The number of random numbers to generate.
 * @param {number} max - The maximum value for the random numbers.
 * @returns {number[]} An array of random numbers.
 */
export const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
  const randomNumbers: Set<number> = new Set();
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max + 1));
    randomNumbers.add(randomNumber);
  }
  return Array.from(randomNumbers);
};

/**
 * Shuffles the elements of an array randomly.
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} The shuffled array.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
