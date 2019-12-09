import { render } from "@testing-library/react";
import React from "react";
import { TeamListView } from "./TeamListView";
import { AppSocket } from "../appSocket";
import { anything, instance, mock, verify } from "ts-mockito";
import { MockedClient } from "../MockSocket";
import { UserDataService } from "../services/user.service";
import { TeamDTO } from "../dto/team.dto";


describe('Team List View', () => {
  it('ensure app is connected to user_changed',  async () => {
    const socketMock = mock(MockedClient);
    
    jest.spyOn(AppSocket, 'createNew').mockReturnValue(instance(socketMock));
    jest.spyOn(UserDataService, 'syncUsers').mockResolvedValue();
    jest.spyOn(UserDataService, 'getUsers').mockResolvedValue([]);
    jest.spyOn(UserDataService, 'getTeam')
      .mockResolvedValue({
        name: "TEST WORKSPACE"
      } as TeamDTO);
    
    const {findByTestId} = render(<TeamListView />);
    
    const titleElement = await findByTestId('TeamListView-title');
    
    // Validate that we see the team
    expect(titleElement.innerHTML).toBe("Welcome to TEST WORKSPACE");
    // Validate that we see the user_change event being hooked into.
    verify(socketMock.on('user_changed', anything())).called()
  });
});
