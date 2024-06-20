'use client';

import { useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";

const Selections: React.FC = () => {
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [opponentSelection, setOpponentSelection] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const selections = ["rock", "paper", "scissors"];

  const handleSelection = (selection: string) => {
    setUserSelection(selection);
    setTimeout(() => {
      const opponentMove = selections[Math.floor(Math.random() * selections.length)];
      setOpponentSelection(opponentMove);
      setShowResult(true);
    }, 500); // Delay to sync with the animation duration
  };

  return (
    <Grid container className="selections">
      {!showResult && (
        <>
          <div className="backgroundImageContainer">
            <Image src='/images/bg-triangle.svg' alt='background triangle' layout='fill' objectFit='contain'/>
          </div>
          <Grid container className="firstRow">
            <Grid item className="rockContainer" onClick={() => handleSelection("rock")}>
              <Grid container className="iconCircle rock">
                <Image src="/images/icon-rock.svg" alt="Select Rock" width={100} height={100} />
              </Grid>
            </Grid>
            <Grid item className="paperContainer" onClick={() => handleSelection("paper")}>
              <Grid container className="iconCircle paper">
                <Image src="/images/icon-paper.svg" alt="Select Paper" width={100} height={100} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="scissorsContainer" onClick={() => handleSelection("scissors")}>
            <Grid item className="iconCircle scissors">
              <Image src="/images/icon-scissors.svg" alt="Select Scissors" width={100} height={100} />
            </Grid>
          </Grid>
        </>
      )}
      {showResult && (
        <div className="resultContainer">
          <div className={`userSelection iconCircle ${userSelection}`}>
            <Image src={`/images/icon-${userSelection}.svg`} alt={`Selected ${userSelection}`} width={100} height={100} />
          </div>
          {opponentSelection && (
            <div className={`opponentSelection iconCircle ${opponentSelection}`}>
              <Image src={`/images/icon-${opponentSelection}.svg`} alt={`Opponent selected ${opponentSelection}`} width={100} height={100} />
            </div>
          )}
        </div>
      )}
    </Grid>
  );
};

export default Selections;

