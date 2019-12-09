import React, { useEffect, useState } from "react";
import { getTeam, getUsers, syncUsers } from "../services/user.service";
import { UserCardList } from "../components/UserCardList/UserCardList";
import { appSocket } from "../appSocket";
import { UserDTO } from "../dto/user.dto";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { TeamDTO } from "../dto/team.dto";

const useStyles = makeStyles({
  title: {
    fontSize: 32,
  },
});

export const TeamListView = () => {
  const {title} = useStyles();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [team, setTeam] = useState<TeamDTO>();
  // useCallback used here so that we do not recreate this function.
  // this allows me to unregister this function on clean up
  const retrieveUsers = React.useCallback(
    async () => {
      const users = await getUsers();
      setUsers(users);
    }, []);
  
  async function didMount() {
    await syncUsers();
    await retrieveUsers();
    const t = await getTeam();
    setTeam(t);
    // called every time the server emits a user_changed event
    appSocket.on("user_changed", retrieveUsers);
  }
  
  useEffect(() => {
    didMount();
    // Cleanup the retreiveUsers function
    return () => {
      appSocket.removeListener("user_changed", retrieveUsers);
    };
    // These functions will not change so this lint rule is not necessary.
    // If "in the future" that it might change, I want to actively decide how the
    // component should work.
    // eslint-disable-next-line
  }, []);
  
  return (
    <Box>
      <Typography component={"h1"} align={"center"} className={title}>Welcome to {team?.name}</Typography>
      <UserCardList users={users}/>
    </Box>
  );
};
