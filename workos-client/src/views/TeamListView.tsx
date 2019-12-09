import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getUsers, syncUsers } from "../services/user.service";
import { UserCardList } from "../components/UserCardList/UserCardList";
import { appSocket } from "../appSocket";
import { UserDTO } from "../dto/user.dto";

export const TeamListView = () => {
  
  const [users, setUsers] = useState<UserDTO[]>([]);
  // useCallback used here so that we do not recreate this function.
  const retrieveUsers = React.useCallback(async () => {
    // called every time the server emits a user_changed event
    const users = await getUsers();
    setUsers(users);
  }, []);
  
  async function didMount() {
    await syncUsers();
    await retrieveUsers();
    appSocket.on("user_changed", retrieveUsers);
  }
  
  useEffect(() => {
    didMount();
    return () => {
      appSocket.removeListener("user_changed", retrieveUsers);
    };
    // These functions will not change so this lint rule is not necessary.
    // If "in the future" that it might change, I want to actively decide how the
    // component should work.
    // eslint-disable-next-line
  }, []);
  
  return (
    <Box width={800}>
      <UserCardList users={users}/>
    </Box>
  );
};
