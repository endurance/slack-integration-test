import React from "react";
import {
  Avatar,
  Box,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProfileDetails } from "../ProfileDetails";
import classnames from "classnames";
import { UserDTO } from "../../dto/user.dto";

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
  updatedStyle: {
    fontSize: 12,
  },
  updatedLabel: {
    fontSize: 12,
  },
});

const formatDateString = (updated: number): Date | string => {
  if (updated === 0) {
    return "N/A";
  }
  return new Date(updated * 1000).toLocaleDateString();
};

export const UserCard = ({user}: Props) => {
  const {disabled, container, updatedStyle, updatedLabel} = useStyles();
  const disabledClass = user.deleted && disabled;
  const testId = `usercard-${user.id}`;
  return (
    <Box m={2} className={classnames(container, disabledClass)} data-testid={testId}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <CardHeader
            avatar={<Avatar variant={"circle"} src={user.profile.image_48}/>}
            title={user.real_name}
            subheader={user.profile.status_text}
          />
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} ml={"auto"}>
            <FormLabel className={updatedLabel}>Last Updated</FormLabel>
            <Typography className={updatedStyle}>{formatDateString(user.updated)}</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProfileDetails user={user}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
