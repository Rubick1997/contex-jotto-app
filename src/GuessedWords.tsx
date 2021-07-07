import React, { FunctionComponent } from "react";
import { GuessedWordsType } from "./types";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import languageContext from "./contexts/languageContext";
import { getStringByLanguage } from "./helpers/strings";
import guessedWordsContext from "./contexts/guessedWordsContext";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const GuessedWords: FunctionComponent = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  const guessedWordsArr = guessedWords as GuessedWordsType[];

  const guessedWordsRows: JSX.Element[] = guessedWordsArr.map((word, index) => (
    <TableRow key={index} data-test="guessed-word">
      <TableCell>{word.guessedWord}</TableCell>
      <TableCell>{word.letterMatchCount}</TableCell>
    </TableRow>
  ));

  const contents =
    guessedWords.length === 0 ? (
      <span data-test="guess-instructions">
        {getStringByLanguage(language, "guessPrompt")}
      </span>
    ) : (
      <TableContainer component={Paper} data-test="guessed-words">
        <h3>{getStringByLanguage(language, "guessColumnHeader")}</h3>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {getStringByLanguage(language, "guessedWords")}
              </StyledTableCell>
              <StyledTableCell>
                {getStringByLanguage(language, "matchingLettersColumnHeader")}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <tbody>{guessedWordsRows}</tbody>
        </Table>
      </TableContainer>
    );

  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
