import React from "react";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import { TeamListView } from "./views/TeamListView";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#F5F5F5",
    height: "100vh",
    width: "100vw",
    overflow: 'scroll',
  },
});
const App: React.FC = () => {
  const {container} = useStyles();
  return (
    <Box className={container}>
      <CssBaseline/>
      <TeamListView/>
    </Box>
  );
};

export default App;
