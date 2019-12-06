import React from "react";
import MUIDataTable from "mui-datatables";
import { UserDTO } from "../services/user.service";

type Props = {
  users: UserDTO[]
}

export const TeamList = ({users}: Props) => {
  const columns = ["id", "slack_id", "real_name", "name"];
  return (
    <div>
      <MUIDataTable
        title={"Slack List"}
        data={users}
        columns={columns}
      />
    </div>
  );
};

