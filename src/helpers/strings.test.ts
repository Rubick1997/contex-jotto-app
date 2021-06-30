import { getStringByLanguage }  from "./strings";

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

test("returns corect submit string for english", () => {
  const string = getStringByLanguage("en", "submit", strings);
  expect(string).toBe("submit");
});

test("returns the correct submit string for emoji", () => {
  const string = getStringByLanguage("emoji", "submit", strings);
  expect(string).toBe("🚀");
});

test("returns english submit string when language does not exists", () => {
    const string = getStringByLanguage("not a language", "submit", strings);
    expect(string).toBe("submit");
});

test("returns english submit string when submit key does not exists for language", () => {
    const string = getStringByLanguage("mermish", "submit", strings);
    expect(string).toBe("submit");
});
