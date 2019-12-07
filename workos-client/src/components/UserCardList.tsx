import React from 'react';
import { UserCard } from "./UserCard/UserCard";
import { UserDTO } from "../dto/user.dto";

type Props = {
  users: UserDTO[];
}

export const UserCardList = ({users}: Props) => {
  return (
    <>
      {(users || []).map(user => {
        return <UserCard key={user.id} user={user} />
      })}
    </>
  )
};
