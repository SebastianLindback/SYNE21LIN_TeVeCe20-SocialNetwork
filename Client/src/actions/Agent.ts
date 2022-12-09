import axios, { AxiosResponse } from 'axios'
import { Post } from '../models/Post'
import { PostsResponse } from "../models/PostsResponse"
import { PostResponse } from "../models/PostResponse"

axios.defaults.baseURL = 'https://localhost:7064/api'

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string, params?: URLSearchParams) =>
      axios
        .get<T>(url, { params })
        .then(responseBody),
    post: <T>(url: string, body: {}) =>
      axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  }

  const Posts = {
    All: (params?: URLSearchParams) => requests.get<PostsResponse>('/Post', params),
    User: (id?: string) => requests.get<PostsResponse>(`/Post/${id}`),
    Save: (post: Post) => requests.post<PostResponse>('/Post', post),
  }

  const Agent = {
    Posts
  }

  export default Agent;