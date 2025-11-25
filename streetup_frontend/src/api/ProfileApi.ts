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

export const createProfile = async (data: FormData) => {
  const res = await api.post("/profiles/", data, {
    withCredentials: true,
  });
  return res.data;
};
export async function editProfile(data: ProfileForm) {
  const formData = new FormData();

  if (data.photo && data.photo[0]) {
    formData.append("photo", data.photo[0]);
  }

  formData.append("age", String(data.age));
  formData.append("location", data.location);
  formData.append("description", data.description);
  data.sports?.forEach((sport) => formData.append("sports", sport));

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
