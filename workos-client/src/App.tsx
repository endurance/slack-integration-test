import React from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { TeamListView } from "./views/TeamListView";

const App: React.FC = () => {
  return (
    <Box>
      <CssBaseline/>
      <TeamListView/>
    </Box>
  );
};

export default App;
