import { Grid } from "@mui/material"

const Scoreboard: React.FC = () => {
    return (
        <Grid container className="top-bar">
        <Grid item className="title">
          <div>ROCK</div>
          <div>PAPER</div>
          <div>SCISSORS</div>
        </Grid>
        <Grid item className="scoreboard">
          <div className="score-label">SCORE</div>
          <div className="score">12</div>
        </Grid>
      </Grid>
    )
}

export default Scoreboard;