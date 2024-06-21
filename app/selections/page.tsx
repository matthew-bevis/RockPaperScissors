'use client';

import { useState, useRef } from "react";
import { Grid, Button } from "@mui/material";
import Image from "next/image";
import gsap from "gsap";

interface SelectionsProps {
  winCount: number;
  setWinCount: (count: number) => void;
}

const Selections: React.FC<SelectionsProps> = ({ winCount, setWinCount }) => {
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [opponentSelection, setOpponentSelection] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [animationStage, setAnimationStage] = useState<string>("");
  const [winner, setWinner] = useState<string | null>(null);

  const userSelectionRef = useRef<HTMLDivElement>(null);
  const opponentSelectionRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);

  const selections = ["rock", "paper", "scissors"];

  const handleSelection = (selection: string) => {
    setUserSelection(selection);
    setTimeout(() => {
      const opponentMove = selections[Math.floor(Math.random() * selections.length)];
      setOpponentSelection(opponentMove);
      setShowResult(true);
      setAnimationStage("slideIn");

      // Determine the winner
      const determineWinner = (user: string, opponent: string) => {
        if (user === opponent) {
          return "tie";
        }
        if (
          (user === "rock" && opponent === "scissors") ||
          (user === "scissors" && opponent === "paper") ||
          (user === "paper" && opponent === "rock")
        ) {
          setWinCount(winCount + 1);
          return user;
        }
        setWinCount(0);
        return opponent;
      };

      setWinner(determineWinner(selection, opponentMove));

      // Slide in animations
      gsap.fromTo(userSelectionRef.current, { x: '-100%', transform: 'none' }, { x: '0%', duration: 0.3, clearProps: 'transform' });
      gsap.fromTo(opponentSelectionRef.current, { x: '100%', transform: 'none' }, { x: '0%', duration: 0.3, clearProps: 'transform', onComplete: () => {
        // Rear back animations
        setAnimationStage("rearBack");
        gsap.to(userSelectionRef.current, { x: '-20%', duration: 0.2, clearProps: 'transform' });
        gsap.to(opponentSelectionRef.current, { x: '20%', duration: 0.2, clearProps: 'transform', onComplete: () => {
          // Slam together animations
          setAnimationStage("slamTogether");
          gsap.to(userSelectionRef.current, { x: '0%', duration: 0.2, clearProps: 'transform' });
          gsap.to(opponentSelectionRef.current, { x: '0%', duration: 0.2, clearProps: 'transform', onComplete: () => {
            // Ensure selections touch in the middle
            gsap.to(userSelectionRef.current, { x: '0%', duration: 0, clearProps: 'transform' });
            gsap.to(opponentSelectionRef.current, { x: '0%', duration: 0, clearProps: 'transform' });
            // Hide selections and start explosion
            gsap.to(userSelectionRef.current, { opacity: 0, duration: 0 });
            gsap.to(opponentSelectionRef.current, { opacity: 0, duration: 0 });
            setAnimationStage("explode");
            createExplosion();
            gsap.to(explosionRef.current, { opacity: 1, scale: 1, duration: 0.2 });
            gsap.to(explosionRef.current, { opacity: 0, scale: 1.5, duration: 0.2, delay: 0.1, onComplete: () => {
              // Show winner immediately after the explosion
              setAnimationStage("showWinner");
            }});
          }});
        }});
      }});
    }, 500); // Initial delay
  };

  const createExplosion = () => {
    if (explosionRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        explosionRef.current.appendChild(particle);
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          scale: Math.random() * 200,
          opacity: 0,
          duration: 1,
          onComplete: () => { if (explosionRef.current) {
            explosionRef.current.removeChild(particle);
          }
        },
        });
      }
    }
  };

  const resetGame = () => {
    setUserSelection(null);
    setOpponentSelection(null);
    setShowResult(false);
    setAnimationStage("");
    setWinner(null);
  };

  return (
    <Grid container className="selections">
      {!showResult && (
        <>
          <Image src='/images/bg-triangle.svg' alt='background triangle' layout='fill' objectFit='contain'/>
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
        <div className={`resultContainer ${animationStage}`}>
          <div
            ref={userSelectionRef}
            className={`userSelection iconCircle ${userSelection} ${animationStage === "showWinner" || animationStage === "explode" ? "hidden" : ""} ${animationStage ? "animating" : ""}`}
          >
            <Image src={`/images/icon-${userSelection}.svg`} alt={`Selected ${userSelection}`} width={100} height={100} />
          </div>
          {opponentSelection && (
            <div
              ref={opponentSelectionRef}
              className={`opponentSelection iconCircle ${opponentSelection} ${animationStage === "showWinner" || animationStage === "explode" ? "hidden" : ""} ${animationStage ? "animating" : ""}`}
            >
              <Image src={`/images/icon-${opponentSelection}.svg`} alt={`Opponent selected ${opponentSelection}`} width={100} height={100} />
            </div>
          )}
          <div ref={explosionRef} className="explosion"></div>
        </div>
      )}
      {animationStage === "showWinner" && (
        <div className="winnerContainer">
          {winner === "tie" ? (
            <>
              <div className="resultMessage">
                <h2>It&apos;s a Tie!</h2>
              </div>
              <Button variant="contained" color="primary" onClick={resetGame} className="retryButton">
                Retry
              </Button>
            </>
          ) : (
            <>
              <div className="resultMessage">
                {winner === userSelection ? (
                  <h2>You Win!</h2>
                ) : (
                  <h2>You Lose!</h2>
                )}
              </div>
              <div className={`winner iconCircle result ${winner}`}>
                <Image src={`/images/icon-${winner}.svg`} alt={`Winner ${winner}`} width={100} height={100} />
              </div>
              <Button variant="contained" color="primary" onClick={resetGame} className="retryButton">
                Retry
              </Button>
            </>
          )}
        </div>
      )}
    </Grid>
  );
};

export default Selections;










