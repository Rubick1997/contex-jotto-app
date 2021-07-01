import React, { FunctionComponent } from "react";

const LanguagePicker: FunctionComponent<{
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLanguage }) => {
  const languages = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😊" },
  ];

  const languageIcons = languages.map((item) => (
    <span
      data-test="language-icon"
      key={item.code}
      onClick={() => setLanguage(item.code)}
    >
      {item.symbol}
    </span>
  ));

  return <div data-test="component-language-picker">{languageIcons}</div>;
};

export default LanguagePicker;
