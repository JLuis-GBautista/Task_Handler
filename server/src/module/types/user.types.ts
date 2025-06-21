export type InsertUser = {
    name: string,
    email: string,
    password: string
}

export type StatusT = "Pending" | "Completed";

export type InsertTask = {
  title: string,
  description: string,
  status: StatusT,
  idUser: number,
}

export type UpdateTask = {
  title?: string,
  description?: string,
  status?: StatusT,
  idUser?: number,
}