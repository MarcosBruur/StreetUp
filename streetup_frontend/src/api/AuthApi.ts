import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ActiveUserSchema } from "../types";

export async function getUser() {
  try {
    const { data } = await api("/auth/user");
    const response = ActiveUserSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
