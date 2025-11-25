import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TeamApiSchema, type Team, type TeamForm } from "../types/index";

type getTeamsProps = {
  page: number;
  page_size: number;
};

export async function getTeams(paginator: getTeamsProps) {
  try {
    const { data } = await api(
      `/teams/?page=${paginator.page}&page_size=${paginator.page_size}`
    );
    const response = TeamApiSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createTeam(formData: TeamForm) {
  try {
    const { data } = await api.post("/teams/", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTeamByUser() {
  try {
    const { data } = await api<Team[]>("/teams/getTeamsByUser");
    const response = TeamApiSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
