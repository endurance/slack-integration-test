import React from "react";
import { Box, FormLabel, Typography } from "@material-ui/core";
import { UserDTO } from "../../dto/user.dto";

type Props = {
  user: UserDTO
}

export const ProfileDetails = ({user}: Props) => {
  const LabelGroup = Box;
  const ContentGroup = Box;
  return (
    <Box display={'flex'} flexDirection={'row'}>
      
      <ContentGroup mr={2} pl={2}>
        <LabelGroup mb={2}>
          <FormLabel>Username</FormLabel>
          <Typography>{user.name}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Display Name</FormLabel>
          <Typography>{user.profile.display_name || "N/A"}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Is Admin</FormLabel>
          <Typography>{user.is_admin ? "Yes" : "No"}</Typography>
        </LabelGroup>
      </ContentGroup>
      
      <ContentGroup>
        <LabelGroup mb={2}>
          <FormLabel>Title</FormLabel>
          <Typography>{user.profile.title || "N/A"}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Phone</FormLabel>
          <Typography>{user.profile.phone || "N/A"}</Typography>
        </LabelGroup>
        
        <LabelGroup mb={2}>
          <FormLabel>Timezone</FormLabel>
          <Typography>{user.tz_label || "N/A"}</Typography>
        </LabelGroup>
      </ContentGroup>
      
    </Box>
  );
};

