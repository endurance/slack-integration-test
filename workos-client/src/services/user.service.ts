import { apiClient } from "./api/axiosClient";

export class UserDTO {
  id!: number;
  slack_id!: string;
  name!: string;
  real_name!: string;
}


export const syncUsers = async () => {
  await apiClient.post('/user/sync');
};

export const getUsers = async () => {
  const response = await apiClient.get<UserDTO[]>('/user/list');
  return response.data;
};
