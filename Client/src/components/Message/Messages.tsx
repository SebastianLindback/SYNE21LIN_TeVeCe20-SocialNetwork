import Agent from '../../actions/Agent';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import MessageReply from './MessageReply';
import MessagesList from './MessagesList';
import { AxiosError } from 'axios';
import { MessagesResponse } from '../../models/MessagesResponse';

const Messages = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>(); 
    const queryKey = [`conversation-${userAId}-${userBId}`];
    const { isLoading, isError, error, data, failureCount, refetch  } = useQuery<MessagesResponse, AxiosError, MessagesResponse, string[]>({
        queryKey: queryKey,
        retry: (failureCount, error) => failureCount < 1 && error.response?.status === 400,
        retryDelay: 3000,
        
        queryFn: async () =>{
            const response = await Agent.Messages.Conversation(userAId!, userBId!);
            return response;
        }
    });
    

    if (isError) return (
        console.log(error),
        <div className="row rounded">
            <div className="col-sm bg-danger text-dark font-weight-bold p-4 mb-4 rounded">
                {`An error has occurred: ${error.response?.data ? error.response?.data : error.message}`}
            </div>
        </div>
    );    
    
    if (isLoading) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                <span>
                    Loading...
                    <br />
                    {failureCount > 1 && `Retrying... Number of failed requests: ${failureCount}`}
                </span>
            </div>
        </div>
    );

    var isNewConversation = data.messages.length === 0;
    if (isNewConversation){
        return <>
            <MessageReply 
            title={`Start a new conversation with ${data!.usersInConversation!.find(x => x.id === +userBId!)!.name}`} 
            buttonText={"Send"}
            queryKey={queryKey}/>
        </>
    }

    return <>
        <MessageReply 
        title={`Continue your conversation with ${data!.usersInConversation!.find(x => x.id === +userBId!)!.name}`} 
        buttonText={"Reply"}
        queryKey={queryKey}/>
        
        <MessagesList 
        response={data}/>

    </>
}

export default Messages;