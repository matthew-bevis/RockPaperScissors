import { Grid } from "@mui/material";

interface ScoreboardProps {
  winCount: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ winCount }) => {
  return (
    <Grid container className="top-bar">
      <Grid item className="title">
        <div>ROCK</div>
        <div>PAPER</div>
        <div>SCISSORS</div>
      </Grid>
      <Grid item className="scoreboard">
        <div className="score-label">SCORE</div>
        <div className="score">{winCount}</div>
      </Grid>
    </Grid>
  );
};

export default Scoreboard;
