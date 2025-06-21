export type RefreshResponse = {
  accessToken: string,
}

export type AuthResponse = {
  ok: boolean,
  accessToken: string,
}

export type LogoutResponse = {
  ok: boolean,
  message: string
}

export type SessionResponse = {
  id: number;
  name: string,
  email: string,
  password: string
}

export type StatusT = 'Pending' | 'Completed';

export type ListTaskResponse = {
  id: number,
  title: string,
  description: string,
  status: StatusT,
  idUser: number,
}[];

export type InsertTask = {
  title: string,
  description: string,
  status: StatusT,
  idUser: number,
}

export type EditTask = {
  title: string,
  description: string,
  status: StatusT,
  idUser: number,
}

export type CreateTaskResponse = {
  id: number,
  title: string,
  description: string,
  status: StatusT,
  idUser: number,
}

export type InsuranceRecommendationRequest = {
  occupation: string,
  salary: string,
}

export type InsuranceRecommendationResponse = { ok: boolean, recommendation: string };