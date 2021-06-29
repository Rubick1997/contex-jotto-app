import { getLetterMatchCount } from ".";

describe("getLetterMatchCount", () => {
  const secretWord = "island";

  test("returns correct count when there are no matching letters", () => {
    const letterMatchCount = getLetterMatchCount("hero", secretWord);
    expect(letterMatchCount).toBe(0);
  });

  test("returns the correct count when there are three matching letters", () => {
    const letterMatchCount = getLetterMatchCount("endeavor", secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test("returns the correct count when there are duplicate letters in the guess", () => {
    const letterMatchCount = getLetterMatchCount("banana", secretWord);
    expect(letterMatchCount).toBe(2);
  });
});
