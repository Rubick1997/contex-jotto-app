import React from "react";
import { LanguageContextType } from "./types";
import { Chip } from "@material-ui/core";
import { FunctionComponent } from "react";
import languageContext from "./contexts/languageContext";
import { getStringByLanguage } from "./helpers/strings";
import { useSuccess } from "./contexts/successContext";

const Congrats: FunctionComponent<LanguageContextType> = () => {
  const [success] = useSuccess();
  const language = React.useContext(languageContext);

  if (success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          <Chip
            label={getStringByLanguage(language, "congrats")}
            style={{ backgroundColor: "green" }}
          />
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
export default Congrats;
