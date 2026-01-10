import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  UserSchema,
  type LoginForm,
  type RegisterForm,
  type Token,
  type User,
} from "../types/index";

export async function createUser(formData: RegisterForm) {
  try {
    const request = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };
    const { data } = await api.post("/auth/create_account/", request);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function loginUser(formData: LoginForm) {
  
  try {
    const request = {
      email: formData.email,
      password: formData.password,
    };

    const { data } = await api.post<Token>("/auth/login/", request);

    const access = data.tokens["access"];
    const refresh = data.tokens["refresh"];

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
 }
}

export async function getUsers() {
  try {
    const { data } = await api("/users");
    const response = UserSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUserById(id: User["id"]) {
  try {
    const { data } = await api<User>(`/users/${id}`);

    const response = UserSchema.safeParse(data);
    console.log(response);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function userHaveProfile(id: User["id"]) {
  try {
    const { data } = await api<User>(`/users/${id}`);

    return !!data.profile;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
