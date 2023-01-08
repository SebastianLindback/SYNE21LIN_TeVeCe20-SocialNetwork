import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import Agent from './Agent';
import { MessagesResponse } from '../models/MessagesResponse';
import { AxiosError } from 'axios';
import { Message } from '../models/Message';

export function GetConversation(userAId : string, userBId : string) {
    const queryKey = [`conversation-${userAId}-${userBId}`];
    const { isLoading, isError, error, data, failureCount  } = useQuery<MessagesResponse, AxiosError, MessagesResponse, string[]>({
        queryKey: queryKey,
        retry: (failureCount, error) => failureCount < 1 && error.response?.status === 400,
        retryDelay: 3.000,
        staleTime: 30.000,
        queryFn: () =>{
            return  Agent.Messages.Conversation(userAId!, userBId!);
        }
    });
    return {isLoading, isError, error, data, failureCount, queryKey }
}

export function SendMessage(queryKey : string[]) {
    const queryClient = useQueryClient();
    const sendMessageMutation = useMutation((message : Partial<Message>) => { return Agent.Messages.Send(message)}
    ,
    {
        onSuccess : () => {
            queryClient.invalidateQueries(queryKey);
            queryClient.refetchQueries(queryKey);
        } 
    });
    return sendMessageMutation
}

