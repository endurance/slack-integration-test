import React from "react";
import {
  Avatar,
  Box,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProfileDetails } from "./ProfileDetails";
import classnames from "classnames";
import { UserDTO } from "../dto/user.dto";

type Props = {
  user: UserDTO;
}

const useStyles = makeStyles({
  disabled: {
    opacity: .3,
  },
  container: {
    width: 384,
  },
});

export const UserCard = ({user}: Props) => {
  const {disabled, container} = useStyles();
  const disabledClass = user.deleted && disabled;
  return (
    <Box m={2} className={classnames(container, disabledClass)}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <CardHeader
            avatar={<Avatar variant={"circle"} src={user.profile.image_48}/>}
            title={user.real_name}
            subheader={user.profile.status_text}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProfileDetails user={user}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
