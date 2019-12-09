import React from "react";
import { UserDTO } from "../../dto/user.dto";
import { ProfileDTO } from "../../dto/profile.dto";
import { render } from "@testing-library/react";
import { ProfileDetails } from "./ProfileDetails";

describe("ProfileDetails Unit Test", () => {
  it("should render full user object", () => {
    const userDTO = new UserDTO();
    const profile = new ProfileDTO();
    userDTO.profile = profile;
    
    userDTO.name = "Endurance Idehen";
    userDTO.profile.display_name = "Ed";
    userDTO.is_admin = true;
    userDTO.profile.title = "title?";
    userDTO.profile.phone = "123-123-1234";
    userDTO.tz_label = "Central";
    const {getByTestId} = render(<ProfileDetails user={userDTO}/>);
    
    expect(getByTestId('username').innerHTML).toBe(userDTO.name);
    expect(getByTestId('displayName').innerHTML).toBe(userDTO.profile.display_name);
    expect(getByTestId('isAdmin').innerHTML).toBe("Yes");
    expect(getByTestId('title').innerHTML).toBe(userDTO.profile.title);
    expect(getByTestId('phone').innerHTML).toBe(userDTO.profile.phone);
    expect(getByTestId('tzLabel').innerHTML).toBe(userDTO.tz_label);
  });
  
  it("should render N/A", () => {
    const userDTO = new UserDTO();
    const profile = new ProfileDTO();
    userDTO.profile = profile;
    
    userDTO.name = "Endurance Idehen";
    const {getByTestId} = render(<ProfileDetails user={userDTO}/>);
  
    expect(getByTestId('username').innerHTML).toBe(userDTO.name);
    expect(getByTestId('displayName').innerHTML).toBe("N/A");
    expect(getByTestId('isAdmin').innerHTML).toBe("No");
    expect(getByTestId('title').innerHTML).toBe("N/A");
    expect(getByTestId('phone').innerHTML).toBe("N/A");
    expect(getByTestId('tzLabel').innerHTML).toBe("N/A");
  
  });
});
