import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getUsers, syncUsers } from "../services/user.service";
import { UserCardList } from "../components/UserCardList";
import { appSocket } from "../appSocket";
import { UserDTO } from "../dto/user.dto";


export const TeamListView: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  
  async function didMount() {
    await syncUsers();
    const users = await getUsers();
    setUsers(users);
    appSocket.on("user_changed", async () => {
      // called every time the server emits a user_changed event
      const users = await getUsers();
      setUsers(users);
    });
  }
  
  useEffect(() => {
    didMount();
  }, []);
  
  return (
    <Box width={800}>
      <UserCardList users={users}/>
    </Box>
  );
};
