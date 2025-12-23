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

export async function confirmAccount(code:number){
  try{
    const {data} = await api.post("/auth/confirm_account/",code)
    return data 
  }catch(error){
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function resendEmail(email:string){
  try{
    const {data} = await api.post("/auth/send_email",{email});
    return data
  }catch(error){
    if(isAxiosError(error)&& error.response){
      throw new Error(error.response.data.error)
    }
  }
}
