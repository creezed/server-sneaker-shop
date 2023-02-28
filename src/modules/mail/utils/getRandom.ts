export function getRandomCode(max: number): number {
  const result = [];

  for (let i = 0; i < max; i++) {
    result.push(Math.floor(Math.random() * 9));
  }

  return Number(result.join(''));
}
