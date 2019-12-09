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
          <Typography data-testid={'username'}>{user.name}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Display Name</FormLabel>
          <Typography data-testid={'displayName'}>{user.profile.display_name || "N/A"}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Is Admin</FormLabel>
          <Typography data-testid={'isAdmin'}>{user.is_admin ? "Yes" : "No"}</Typography>
        </LabelGroup>
      </ContentGroup>
      
      <ContentGroup>
        <LabelGroup mb={2}>
          <FormLabel>Title</FormLabel>
          <Typography data-testid={'title'}>{user.profile.title || "N/A"}</Typography>
        </LabelGroup>
  
        <LabelGroup mb={2}>
          <FormLabel>Phone</FormLabel>
          <Typography data-testid={'phone'}>{user.profile.phone || "N/A"}</Typography>
        </LabelGroup>
        
        <LabelGroup mb={2}>
          <FormLabel>Timezone</FormLabel>
          <Typography data-testid={'tzLabel'}>{user.tz_label || "N/A"}</Typography>
        </LabelGroup>
      </ContentGroup>
      
    </Box>
  );
};

