import Agent from '../../actions/Agent';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import Reply from './elements/reply/Reply';
import Messages from './elements/messages/Messages';
import { AxiosError } from 'axios';
import { MessagesResponse } from '../../models/MessagesResponse';
import ConversationError from './ConversationError';
import ConversationLoading from './ConversationLoading';

const Conversation = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>(); 
    
    const queryKey = [`conversation-${userAId}-${userBId}`];
    
    const { isLoading, isError, error, data, failureCount  } = useQuery<MessagesResponse, AxiosError, MessagesResponse, string[]>({
        queryKey: queryKey,
        retry: (failureCount, error) => failureCount < 1 && error.response?.status === 400,
        retryDelay: 3.000,
        staleTime: 30.000,
        queryFn: async () =>{
            return await Agent.Messages.Conversation(userAId!, userBId!);
        }
    });
    
    if (isError) return (<ConversationError error={error}/>);    
    
    if (isLoading) return (<ConversationLoading failureCount={failureCount}/>);

    var nameOfRecipient = data?.usersInConversation && data!.usersInConversation!.find(x => x.id === +userBId!)!.name!;
    
    var isNewConversation = data?.messages?.length === 0;
    if (isNewConversation){
        return <>
            <Reply 
            title={`Start a new conversation with ${nameOfRecipient && nameOfRecipient}`} 
            buttonText={"Send"}
            queryKey={queryKey}/>
        </>
    }

    return <>
        <Reply 
        title={`Continue your conversation with ${nameOfRecipient && nameOfRecipient}`} 
        buttonText={"Reply"}
        queryKey={queryKey}/>
        
        <Messages 
        response={data}/>

    </>
}

export default Conversation;