import React from "react";
import { Button } from "@material-ui/core";
import { syncUsers } from "../services/user.service";

type Props = {
  onClick: Function
}

export const SyncButton = ({ onClick }: Props) => {
  async function click() {
    if (onClick) {
      await syncUsers();
      await onClick();
    }
  }
  return (
    <Button variant={'contained'} color={'primary'} onClick={click}>Sync users</Button>
  );
};

