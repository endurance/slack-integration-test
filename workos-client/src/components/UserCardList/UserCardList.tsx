import React from 'react';
import { UserCard } from "../UserCard/UserCard";
import { UserDTO } from "../../dto/user.dto";

type Props = {
  users: UserDTO[];
}

export const UserCardList = ({users}: Props) => {
  const dtos = [...users];
  dtos.sort((a, b) => a.updated > b.updated ? -1 : 1);
  return (
    <>
      {(dtos || []).map(user => {
        return <UserCard key={user.id} user={user} />
      })}
    </>
  )
};
