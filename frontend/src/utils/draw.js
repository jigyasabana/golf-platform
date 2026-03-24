export function generateDraw() {
  const numbers = new Set();

  while (numbers.size < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    numbers.add(num);
  }

  return Array.from(numbers);
}

export function checkMatches(userScores, drawNumbers) {
  const scoreValues = userScores.map((s) => s.score);

  let matches = 0;

  scoreValues.forEach((score) => {
    if (drawNumbers.includes(score)) {
      matches++;
    }
  });

  return matches;
}