import api from "../lib/axios";
import { isAxiosError } from "axios";
import { type Profile, type ProfileForm } from "../types";

export async function getProfile() {
  try {
    const { data } = await api("/profiles/getProfile/");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProfileById(id:string) {
  try {
    const { data } = await api(`/profiles/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function sendLike(profile_id: Profile["id"]){
  try{
    const {data} = await api(`/profiles/${profile_id}/sendLike`)
    return data;
  }catch(error){
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

type getProfilesProps ={
  search?:string;
}
export async function getProfiles({search}: getProfilesProps) {
  try {
    const { data } = await api("/profiles",{
      params: {search}
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export const createProfile = async (data: ProfileForm) => {
  const formData = new FormData();

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  formData.append("age", String(data.age));
  formData.append("location", data.location);
  formData.append("description", data.description);
  formData.append("sports",JSON.stringify(data.sports));

  
  const res = await api.post("/profiles/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });


  return res.data;
};
export async function editProfile(data: ProfileForm) {
  const formData = new FormData();

  if (typeof(data.photo) === "object") {
    formData.append("photo", data.photo[0]);
  }

  formData.append("age", String(data.age));
  formData.append("location", data.location);
  formData.append("description", data.description);
  formData.append("sports", JSON.stringify(data.sports));

  

  const res = await api.put("/profiles/editProfile/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return res.data;
}

export async function uploadProfileImage(profileId: Profile["id"], file: File) {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const { data } = await api.post(
      `/profiles/${profileId}/upload-photo/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data; // devuelvo la respuesta (probablemente la URL de la imagen)
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error subiendo imagen");
  }
}
