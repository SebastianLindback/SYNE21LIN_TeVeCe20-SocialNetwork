import axios, { AxiosResponse } from 'axios'
import { Post } from '../models/Post'
import { PostsResponse } from "../models/PostsResponse"
import { PostResponse } from "../models/PostResponse"
import { MessagesResponse } from '../models/MessagesResponse'
import { MessageResponse } from '../models/MessageResponse'

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
  const Message = {
    All: (params?: URLSearchParams) => requests.get<MessagesResponse>('/message', params),
    User: (id1?: string, id2?: string) => requests.get<MessagesResponse>(`/message/conversation/?userA=${id1}&userB=${id2}`),
    Send: (post: Post) => requests.post<MessageResponse>('/message', post),
  }

  const Agent = {
    Posts,
    Message
  }

  export default Agent;