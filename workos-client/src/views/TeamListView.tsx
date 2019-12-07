import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getUsers } from "../services/user.service";
import { UserCardList } from "../components/UserCardList";
import { appSocket } from "../appSocket";

export const TeamListView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  
  useEffect(() => {
    appSocket.on('user_changed', async () =>{
      const users = await getUsers();
      setUsers(users);
    });
  }, []);
  
  return (
    <Box width={800}>
      <UserCardList users={users}/>
    </Box>
  );
};
