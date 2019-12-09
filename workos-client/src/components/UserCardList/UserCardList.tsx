import React from "react";
import { UserCard } from "../UserCard/UserCard";
import { UserDTO } from "../../dto/user.dto";
import { Box, makeStyles } from "@material-ui/core";

type Props = {
  users: UserDTO[];
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexFlow: 'row wrap',
    width: '832px',
    "margin-left": "auto",
    "margin-right": "auto",
  },
});

export const UserCardList = ({users}: Props) => {
  const dtos = [...users];
  dtos.sort((a, b) => a.updated > b.updated ? -1 : 1);
  const {container} = useStyles();
  return (
    <Box className={container}>
      {(dtos || []).map(user => (<UserCard key={user.id} user={user}/>))}
    </Box>
  );
};
