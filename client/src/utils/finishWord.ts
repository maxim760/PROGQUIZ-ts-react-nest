type IWords = [string, string, string]
export const finishWord = (num: number, words: IWords) => {
  const ost = num % 10
  if (ost == 1 && num % 100 !== 11) {
    return words[0]
  }
  if (ost >= 2 && ost <= 4) {
    return words[1]
  }
  return words[2]
}