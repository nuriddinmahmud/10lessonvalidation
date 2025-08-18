import axios from "axios";

const API_URL = "https://689ed17e3fed484cf8781314.mockapi.io/api/v1/users";

export const getUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axios.post(API_URL, user);
  return data;
};

export const deleteUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateUser = async (id: string, user: any) => {
  const { data } = await axios.put(`${API_URL}/${id}`, user);
  return data;
};
