import { z } from "zod";
import type { JwtPayload } from "jwt-decode";
export interface CustomJwtPayload extends JwtPayload {
  user_id: string;
}



export const sportsOptions = ["futbol","basquet","tenis","voley","paddle","ciclismo"] as const;



/**AUTH */
export const AuthSchema = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  profile: z.string().nullable(),
  token: z.string(),
});

type Auth = z.infer<typeof AuthSchema>;
export type LoginForm = Pick<Auth, "email" | "password">;
export type RegisterForm = Pick<
  Auth,
  "userName" | "email" | "password" | "repeatPassword"
>;
export type ConfirmToken = Pick<Auth,"token">;
/**--------------- */


export const TokenSchema = z.object({
  message: z.string(),
  tokens: z.object({
    refresh: z.string(),
    access: z.string(),
  }),
});

export const ActiveUserSchema = z.object({
  confirmed: z.boolean(),
  email: z.string(),
  id: z.string(),
  profile: z.string().nullable(),
  userName: z.string(),
});

export const ConfirmAccountSchema = z.object({
  token: z.number(),
});

export const ConfirmAccountApiSchema = z.object({
  message: z.string()
})

export type ConfirmAccount = z.infer<typeof ConfirmAccountSchema>;
export type ConfirmAccountApi = z.infer<typeof ConfirmAccountApiSchema>;
export type ActiveUser = z.infer<typeof ActiveUserSchema>;
export type Token = z.infer<typeof TokenSchema> & { user: User };


/**USERS */

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  profile: z.string().nullable(),
  confirmed: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

//export type Token = z.infer<typeof TokenSchema>;

export type DraftUser = Omit<User, "id" | "profile">;

//**PROFILES */
export const ProfileStatusSchema = z.enum(["free", "busy"]);
export type ProfileStatus = z.infer<typeof ProfileStatusSchema>;

export const ProfileSchema = z.object({
  id: z.string(),
  photo: z.any().nullable(),
  photo_view: z.string(),
  age: z.number(),
  description: z.string(),
  sports: z.array(z.string()),
  location: z.string(),
  status: ProfileStatusSchema,
});

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileForm = Pick<
  Profile,
  "photo" | "age" | "description" | "sports" | "location"
>;

/**TEAMS */
export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  leader: z.string(),
  members: z.array(z.string()),
  sport: z.enum(sportsOptions),
  description: z.string(),
  location: z.string(),
  photo: z.string(),
});

export const TeamsByUserApiSchema = z.object({
  message: z.string(),
  data: z.array(TeamSchema),
});

export const TeamApiSchema = 
  z.object({
    message: z.string(),
    data: z.object({
      id: z.string(),
      name: z.string(),
      leader: z.string(),
      members: z.array(z.string()),
      sport: z.string(),
      description: z.string(),
      location: z.string(),
    })
  })
;

export const TeamsApiSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(TeamSchema),
});

export type TeamApi = z.infer<typeof TeamApiSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamForm = Pick<
  Team, "name" | "sport" | "description" | "location" | "photo" 
>;


