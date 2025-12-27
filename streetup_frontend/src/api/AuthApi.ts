import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ActiveUserSchema, ConfirmAccountApiSchema, type ConfirmAccountApi } from "../types";

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



export async function confirmAccount(code: string) {
  
  try {
    const { data } = await api.post<ConfirmAccountApi>(
      "/auth/confirm_account/",
      { token: code }
    );

    const response = ConfirmAccountApiSchema.parse(data); // <-- valida o lanza excepción

    return response;   // <-- SIEMPRE retorna { message: string }

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error inesperado confirmando cuenta");
  }
}


export async function resendEmail(email:string){
  try{
    const {data} = await api.post("/auth/send_email/",{email});
    return data
  }catch(error){
    if(isAxiosError(error)&& error.response){
      throw new Error(error.response.data.error)
    }
  }
}
