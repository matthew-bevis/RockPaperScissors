'use client'

import { Grid } from "@mui/material";
import Scoreboard from "./scoreboard/page";
import Selections from "./selections/page";
import { useState } from "react";

export default function Home() {
  const [winCount, setWinCount] = useState<number>(0);
  return (
    <>
      <Grid container className="container">
        <Scoreboard winCount={winCount}/>
        <Selections winCount={winCount} setWinCount={setWinCount}/>
      </Grid>
    </>
  );
}
