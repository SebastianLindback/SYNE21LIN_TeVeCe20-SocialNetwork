import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from './Agent';
import { PostsResponse } from '../models/PostsResponse';
import { AxiosError } from 'axios';

export function GetPostsFromUsers(currentSubscriptionsIDs: number[]) {
    console.log(currentSubscriptionsIDs);
    
    const { data, isLoading, error} = useQuery<PostsResponse, AxiosError>({
        queryKey: ["posts-from-subscriptions"],
        enabled: currentSubscriptionsIDs ? true : false,
        queryFn: () => Agent.Posts.FromUsers(currentSubscriptionsIDs! )
    });
    return { data, isLoading, error};
}