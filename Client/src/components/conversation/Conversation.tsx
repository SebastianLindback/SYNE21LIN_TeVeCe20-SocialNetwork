import { useParams } from 'react-router-dom';
import Reply from './elements/reply/Reply';
import Messages from './elements/messages/Messages';
import ConversationError from './ConversationError';
import ConversationLoading from './ConversationLoading';
import useConversation from './hooks/useConversation';

const Conversation = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>();

    const { isLoading, isError, error, data, failureCount, queryKey } = useConversation({ userAId: userAId!, userBId: userBId! });

    if (isError) return (<ConversationError error={error!} />);

    if (isLoading) return (<ConversationLoading failureCount={failureCount} />);

    var nameOfRecipient = data?.usersInConversation && data!.usersInConversation!.find(x => x.id === +userBId!)!.name!;
    var isNewConversation = data?.messages?.length === 0;

    if (isNewConversation) {
        return <>
            <Reply
                title={`Start a new conversation with ${nameOfRecipient && nameOfRecipient}`}
                buttonText={"Send"}
                queryKey={queryKey} />
        </>
    }

    return <>
        <Reply
            title={`Continue your conversation with ${nameOfRecipient && nameOfRecipient}`}
            buttonText={"Reply"}
            queryKey={queryKey} />

        <Messages
            response={data!} />
    </>
}

export default Conversation;