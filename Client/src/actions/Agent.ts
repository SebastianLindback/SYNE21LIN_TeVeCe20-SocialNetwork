import axios, { AxiosResponse } from 'axios'
import { Post } from "../models/Post";
import { PostsResponse } from "../models/PostsResponse";
import { PostResponse } from "../models/PostResponse";
import { UsersResponse } from "../models/UsersResponse";
import { MessagesResponse } from '../models/MessagesResponse'
import { MessageResponse } from '../models/MessageResponse'
import { Message } from '../models/Message'
import { SubscribersResponse } from '../models/SubscribersResponse';

axios.defaults.baseURL = "https://localhost:7064/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axios.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Posts = {
  All: (params?: URLSearchParams) =>
    requests.get<PostsResponse>("/Post", params),
  User: (id?: string) => requests.get<PostsResponse>(`/Post/${id}`),
  Save: (post: Post) => requests.post<PostResponse>("/Post", post),
};

const Users = {
  All: (params?: URLSearchParams) =>
    requests.get<UsersResponse>("/user", params),
  User: (name?: string) =>
    requests.get<UsersResponse>(`/user/create?Name=${name}`),
  Send: (post: Post) => requests.post<UsersResponse>("/user", post),
};

const Messages = {
  All: (params?: URLSearchParams) => requests.get<MessagesResponse>('/message', params),
  Conversation: (userA?: string, userB?: string) => requests.get<MessagesResponse>(`/message/conversation/?userA=${userA}&userB=${userB}`),
  Send: (message : Partial<Message>) => requests.post<MessageResponse>('/message/create', message),
}

const Subscription = {
  Subscribe: (Subscriber?: string, SubscribedTo?: string) => requests.get<MessagesResponse>(`/subscription/follow/?Subscriber=${Subscriber}&SubscribedTo=${SubscribedTo}`),
  All: (Fromuser?: string) => requests.get<SubscribersResponse>(`/subscription/GetSubscriptions?userId=${Fromuser}`),
}

const Agent = {
  Posts,
  Messages,
  Users,
  Subscription
};

export default Agent;
