/** Возвращает случайное число до определенного значения с учетом текущего значения для получения нового уникального числа */
export function getRandomNumber(length: number, currentNumber?: number) {
  const randomInt = Math.floor(Math.random() * length);
  if (randomInt === currentNumber)
    return getRandomNumber(length, currentNumber);

  return randomInt;
}
