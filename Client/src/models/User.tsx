import { Post } from "./Post";

export interface User {
    id : number,
    name : string,
    posts: Post[]
}
