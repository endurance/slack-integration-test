import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getUsers } from "../services/user.service";
import { UserCardList } from "../components/UserCardList";
import { appSocket } from "../appSocket";
import { UserDTO } from "../dto/user.dto";


export const TeamListView: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  
  const initialize = () => {
    getUsers().then(setUsers);
  };
  
  useEffect(() => {
    // called once
    initialize();
    appSocket.on('user_changed', async () =>{
      // called every time user changes
      initialize();
    });
  }, []);
  
  return (
    <Box width={800}>
      <UserCardList users={users}/>
    </Box>
  );
};
