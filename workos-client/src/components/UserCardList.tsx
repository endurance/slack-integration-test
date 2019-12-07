import React from 'react';
import { UserCard } from "./UserCard";

type Props = {
  users: any[];
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
