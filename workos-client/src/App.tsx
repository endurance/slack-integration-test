import React from "react";
import { CssBaseline } from "@material-ui/core";
import { TeamListView } from "./views/TeamListView";

const App: React.FC = () => {
  return (
    <div>
      <CssBaseline/>
      <TeamListView/>
    </div>
  );
};

export default App;
