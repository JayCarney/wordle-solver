import { Autocomplete, Box, Button, Chip, Container, Grid, Stack, TextField, Typography } from "@mui/material";
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
        <meta name="description" content="One day project to cheat at Wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">Super Janky Wordle Solver</Typography>
        </Grid>
        {guesses.map((guess, guessNumber) => <Grid item xs={12} key={guessNumber}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack direction={'row'} spacing={1}>
              {guess.map((char, charIndex) => <Box key={charIndex} sx={{...stylesForLetter[char.result], width: 62, height: 62, display: 'inline-flex', alignItems: 'center', fontWeight: 'bold', fontSize: '2rem', justifyContent: 'center'}} onClick={() => toggleGuessState(guessNumber, charIndex)}>{char.letter.toLocaleUpperCase()}</Box>)}
            </Stack>
          </Box>
        </Grid>)}
        <Grid item xs={12}>
          {guesses.length === 0 && <Typography gutterBottom align="center">No guesses yet, select a word bellow as your first guess</Typography>}
          {guesses.length !== 0 && <Typography align="center" gutterBottom>Click each letter to cycle through wordle result status (gray, orange, green)</Typography>}
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
            onChange={(event, value) => value && addWord(value)}
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
