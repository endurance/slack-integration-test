import React, { useEffect, useState } from "react";
import { UserDataService } from "../services/user.service";
import { UserCardList } from "../components/UserCardList/UserCardList";
import { AppSocket } from "../appSocket";
import { UserDTO } from "../dto/user.dto";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { TeamDTO } from "../dto/team.dto";

const useStyles = makeStyles({
  title: {
    fontSize: 32,
  },
});

// A note about React Deps on useEffect
// In this component, these functions will not change so this lint rule is not necessary.
// If "in the future" that it might change, I want to actively decide how the
// component should work.

export const TeamListView = () => {
  const {title} = useStyles();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [team, setTeam] = useState<TeamDTO>();
  // new socket will be created on initial render
  const [socket] = useState(() => AppSocket.createNew());
  // useCallback used here so that we do not recreate this function.
  // this allows me to unregister this function on clean up
  const loadUsers = React.useCallback(
    async () => {
      const users = await UserDataService.getUsers();
      setUsers(users);
    }, []);
  
  async function didMount() {
    await loadUsers();
    setTeam(await UserDataService.getTeam());
  }
  
  // Socket management use effect
  useEffect(() => {
    socket.on("user_changed", loadUsers);
    // eslint-disable-next-line
  }, []);
  
  // Component data management use effect
  useEffect(() => {
    didMount();
    // Cleanup the retreiveUsers function
    return () => {
      socket.removeListener("user_changed", loadUsers);
    };
    // eslint-disable-next-line
  }, []);
  
  return (
    <Box>
      <Typography data-testid={"TeamListView-title"} component={"h1"} align={"center"} className={title}>
        Welcome to {team?.name}
      </Typography>
      <UserCardList users={users}/>
    </Box>
  );
};
