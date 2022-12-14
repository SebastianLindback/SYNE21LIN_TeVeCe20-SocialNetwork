import { User } from "./User";

export interface UsersResponse {
  posts: User[];
  wrapperStyle?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
}
