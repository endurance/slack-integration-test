import { apiClient } from "./api/axiosClient";
import { UserDTO } from "../dto/user.dto";
import { TeamDTO } from "../dto/team.dto";

export const syncUsers = async () => {
  await apiClient.post('/user/sync');
};

export const getUsers = async () => {
  const response = await apiClient.get<UserDTO[]>('/user/list');
  return response.data;
};

export const getTeam = async () => {
  const response = await apiClient.get<{ team: TeamDTO }>('/slack/team');
  return response.data.team;
};
