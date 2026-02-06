import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TeamApiSchema, TeamsByUserApiSchema, TeamSchema, type Team, type TeamForm } from "../types/index";

type getTeamsProps = {
  page: number | undefined;
  page_size: number | undefined;
  search?:string;
  sport?:string;
};

export async function getTeams(paginator: getTeamsProps) {
  try {
    const { data } = await api("/teams/", {
      params: paginator
    });


    return data.results;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export const createTeam = async (formdata: TeamForm) => {
  try{
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("sport", formdata.sport);
    formData.append("description", formdata.description);
    formData.append("location", formdata.location);
    formData.append("photo", formdata.photo);
    const {data} = await api.post("/teams/", formData);
    const response = TeamApiSchema.safeParse(data);
    if(response.success) return response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
  
};


export async function getTeamById(id: Team["id"]) {
  try {
    const { data } = await api(`/teams/${id}`);
    const response = TeamSchema.safeParse(data);

    if (!response.success) {
      console.error(response.error);
      throw new Error("Respuesta inválida del servidor");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getTeamsByLeader(leader_id: Team["leader"]) {
  const formData = new FormData();
  formData.append("leader", leader_id);
  try {
    const { data } = await api.post(`/teams/getTeamsByLeader/`,
      formData
    );

    const response = TeamsByUserApiSchema.safeParse(data);

    if (!response.success) {
      console.error(response.error);
      throw new Error("Respuesta inválida del servidor");
    }
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}


type EditTeamPayload = {
  teamId: string;
  formdata: TeamForm;
};
export async function editTeam({ teamId, formdata }: EditTeamPayload) {
  try{
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("sport", formdata.sport);
    formData.append("description", formdata.description);
    formData.append("location", formdata.location);
    formData.append("photo", formdata.photo);
    const {data} = await api.put(`/teams/${teamId}/`, formData);
    const response = TeamApiSchema.safeParse(data);
    if(response.success) return response.data;
    
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTeamsByUser() {
  try {
    const { data } = await api("/teams/getTeamsByUser");
    const response = TeamsByUserApiSchema.safeParse(data);

    if (!response.success) {
      console.error(response.error);
      throw new Error("Respuesta inválida del servidor");
    }
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function sendLike(team_id: Team["id"]){
  try{
    const {data} = await api(`/teams/${team_id}/sendLike`)
    return data;
  }catch(error){
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

