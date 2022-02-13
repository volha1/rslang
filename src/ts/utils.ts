function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffleArray(array: Array<String>): Array<String> {
  const arrayCopy = array;
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

export { getRandomNumber, shuffleArray };
