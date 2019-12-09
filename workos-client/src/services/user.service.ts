import { apiClient } from "./api/axiosClient";
import { UserDTO } from "../dto/user.dto";
import { TeamDTO } from "../dto/team.dto";

export class UserDataService {
  static syncUsers = async () => {
    await apiClient.post('/user/sync');
  };
  
  static getUsers = async () => {
    const response = await apiClient.get<UserDTO[]>('/user/list');
    return response.data;
  };
  
  static getTeam = async () => {
    const response = await apiClient.get<{ team: TeamDTO }>('/slack/team');
    return response.data.team;
  };
}
