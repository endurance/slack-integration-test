import React from "react";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { UserDTO } from "../services/user.service";

type Props = {
  users: UserDTO[]
}

function getDisplayColumns(users: any[]=[]) {
  const defaultColumns = ["id", "slack_id", "real_name", "name"];
  if (users.length === 0) {
    return defaultColumns as string[];
  }
  const columns = Object.keys(users[0]).map((x) => {
    const display = Boolean(defaultColumns.find((s) => x === s));
    if (x === "profile") return;
    return {
      label: x,
      name: x,
      options: {
        display,
      },
    };
  }).filter(x => x);
  
  return columns as unknown as MUIDataTableColumnDef[];
}

export const TeamList = ({users}: Props) => {
  const columns = getDisplayColumns(users);
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

