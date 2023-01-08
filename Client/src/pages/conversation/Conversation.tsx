import { useParams } from 'react-router-dom';
import Messages from '../../components/Messages';
import ConversationError from './ConversationError';
import ConversationLoading from './ConversationLoading';
import React from 'react';
import { GetConversation } from '../../actions/useMessage';
import ReplyForm from '../../components/ReplyForm';

const Conversation = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>();

    const { isLoading, isError, error, data, failureCount, queryKey } = GetConversation( userAId!, userBId!);

    if (isError) return (<ConversationError error={error!} />);

    if (isLoading) return (<ConversationLoading failureCount={failureCount} />);

    var nameOfRecipient = data?.usersInConversation && data!.usersInConversation!.find(x => x.id === +userBId!)!.name!;
    var isNewConversation = data?.messages?.length === 0;

    if (isNewConversation) {
        return <>
            <ReplyForm
                title={`Start a new conversation with ${nameOfRecipient && nameOfRecipient}`}
                buttonText={"Send"}
                queryKey={queryKey} />
        </>
    }

    return <>
        <ReplyForm
            title={`Continue your conversation with ${nameOfRecipient && nameOfRecipient}`}
            buttonText={"Reply"}
            queryKey={queryKey} />

        <Messages
            response={data!} />
    </>
}

export default Conversation;