import { AppBar, Autocomplete, Box, Button, Chip, Container, Grid, Stack, styled, TextField, Toolbar, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useImmer } from "use-immer";
import { Letter } from "../components/letter";
import styles from "../styles/Home.module.css";
import { createGuessFromWord, Guess, Result } from "../utils/create-guess-from-word";
import { include, includeAtPosition, notInclude, notIncludeAtPosition } from "../utils/filters";
import { Filter, filterWordList } from "../utils/filter-word-list";
import { loadWordlist } from "../utils/load-words";
import { sortWords } from "../utils/sort-words";
import { createFilterList } from "../utils/create-filter-list";

const lastResult = Object.values(Result).pop()

const stylesForLetter = {
  [Result.Invalid]: {
    backgroundColor: '#3a3a3c',
    color: 'white'
  },
  [Result.Orange]: {
    backgroundColor: '#b59f3b',
    color: 'white'
  },
  [Result.Green]: {
    backgroundColor: '#538d4e',
    color: 'white'
  }
}

const wordList = sortWords(loadWordlist() ?? [])

const LetterBox = styled(Box)`
  width: 62px;
  height: 62px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 2rem;
  justify-content: center;
`

const EmptyBox = styled(LetterBox)`
  border: 2px solid #3a3a3c;
`

const Row: React.FC<{guess: Guess; onClick: (charIndex: number) => void}> = (props) => {
  const {guess, onClick} = props
  if (!guess) {
    return <Stack direction={'row'} spacing={1}>
      <EmptyBox />
      <EmptyBox />
      <EmptyBox />
      <EmptyBox />
      <EmptyBox />
    </Stack>
  }
  return <Stack direction={'row'} spacing={1}>
  {guess.map((char, charIndex) => <LetterBox key={charIndex} sx={stylesForLetter[char.result]} onClick={() => onClick(charIndex)}>{char.letter.toLocaleUpperCase()}</LetterBox>)}
</Stack>
}


const Home: NextPage = () => {
  const [guesses, setGuesses] = useImmer<Guess[]>([]);
  const [words, setWords] = useImmer<string[]>(wordList ?? [])
  
  const addWord = React.useCallback((word: string) => {
    setGuesses(existing => {
      existing.push(createGuessFromWord(word))
    })
  }, [setGuesses])
  
  const toggleGuessState = React.useCallback((guessNumber: number, charIndex: number) => {
    setGuesses(existing => {
      let resultValue = existing[guessNumber][charIndex].result
      if (resultValue === lastResult) {
        existing[guessNumber][charIndex].result = Result.Invalid
        return
      }
      existing[guessNumber][charIndex].result = resultValue + 1
    })
  }, [setGuesses])

  React.useEffect(() => {
    setWords(sortWords(filterWordList(wordList ?? [], createFilterList(guesses))))
  }, [guesses, setWords])

  return (
    <Container>
      <Head>
        <title>Super Janky Wordle Solver</title>
        <meta name="description" content="Solve wordle without all the thinking, choose from guesses and get recomended next words" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="h1">
            Wordle Solver
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Grid container spacing={1}>
        {[...Array(6)].map((_, guessNumber) => <Grid item xs={12} key={guessNumber}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Row guess={guesses[guessNumber]} onClick={(charIndex) => toggleGuessState(guessNumber, charIndex)}/>
          </Box>
        </Grid>)}
        <Grid item xs={12}>
          {guesses.length === 0 && <Typography gutterBottom align="center">No guesses yet, select a word bellow as your first guess</Typography>}
          {guesses.length !== 0 && <Typography align="center" gutterBottom>Click each letter to cycle through wordle result status (gray, yellow, green)</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} sx={{marginBottom: 2}}>
              {words.slice(0, 20).map(word => <Grid item key={word}><Chip key={word} label={word} onClick={() => addWord(word)} variant="outlined"/></Grid>)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {guesses.length === 0 && <Typography align="center" sx={{marginBottom: 2}}>Or type a word if you want to go your own way</Typography>}
          <Autocomplete
            disablePortal
            options={words}
            sx={{ width: 300, margin: '0 auto' }}
            value=""
            onChange={(event, value) => {
              value && addWord(value)
            }}
            renderInput={(props) => {
              return <TextField {...props} />
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
