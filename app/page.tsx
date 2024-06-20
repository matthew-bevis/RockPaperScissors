import { Grid } from "@mui/material";
import Scoreboard from "./scoreboard/page";
import Selections from "./selections/page";

export default function Home() {
  return (
    <>
      <Grid container className="container">
        <Scoreboard/>
        <Selections/>
      </Grid>
    </>
  );
}
