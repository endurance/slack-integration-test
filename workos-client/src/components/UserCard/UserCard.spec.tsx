import React from "react";
import { UserDTO } from "../../dto/user.dto";
import { render } from "@testing-library/react";
import { UserCard } from "./UserCard";
import { ProfileDTO } from "../../dto/profile.dto";

describe("User Card Unit Test", () => {
  it("should be disabled if user is `deleted`", () => {
    const userDTO = new UserDTO();
    userDTO.deleted = true;
    userDTO.real_name = "Endurance Idehen";
    userDTO.profile = new ProfileDTO();
    userDTO.profile.status_text = "I AM A REAL BOY";
    userDTO.profile.image_48 = "";
    userDTO.id = 1;
    
    const {getByTestId} = render(
      <UserCard user={userDTO}/>,
    );
    
    // Find disabled class - simple way of determining if the card is disabled
    expect(getByTestId('usercard-1').className).toContain('makeStyles-disabled');
  });
});
