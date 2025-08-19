import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/"
import type { IData } from "../types/types"

export const user = "user"

export const useUser = () => {
  const client = useQueryClient()

  const getUsers = () =>
    useQuery({
      queryKey: [user],
      queryFn: () => api.get("user").then(res => res.data),
    })

  const getUserById = (id: string) =>
    useQuery({
      queryKey: [user, id],                        
      queryFn: () => api.get(`user/${id}`).then(res => res.data),
      enabled: !!id,                                
    })

  const createUser = useMutation({
    mutationFn: (data: IData) => api.post("user", data).then(r => r.data),  
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [user] })
    },
  })

  const deleteUser = useMutation({
    mutationFn: (id: string) => api.delete(`user/${id}`).then(r => r.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [user] })
    },
  })

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IData }) =>
      api.patch(`user/${id}`, data).then(r => r.data),                     
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [user] })
    },
  })

  return { getUsers, getUserById, createUser, deleteUser, updateUser }
}
