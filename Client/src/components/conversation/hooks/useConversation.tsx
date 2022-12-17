import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MessagesResponse } from '../../../models/MessagesResponse';
import Agent from '../../../actions/Agent';

interface props {
    userAId : string,
    userBId : string
}

const useConversation =  ({userAId, userBId} : props) => {
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

export default useConversation