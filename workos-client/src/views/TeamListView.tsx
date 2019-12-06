import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SyncButton } from "../components/SyncButton";
import { TeamList } from "../components/TeamList";
import { getUsers } from "../services/user.service";

export const TeamListView: React.FC = () => {
  const [refresh, toggleRefresh] = useState<boolean>(false);
  const [users, setUsers] = useState();

  function handleSyncClicked() {
    toggleRefresh(!refresh);
  }

  useEffect(() => {
    getUsers().then(setUsers)
  }, [refresh]);

  return (
    <Box width={800}>
      <SyncButton onClick={handleSyncClicked}/>
      <TeamList users={users} />
    </Box>
  );
};
