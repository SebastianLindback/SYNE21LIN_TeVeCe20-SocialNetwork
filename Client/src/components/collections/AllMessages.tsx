import { MessagesResponse } from '../../models/MessagesResponse';
import React from 'react';
import MessageElement from '../elements/MessageElement';
import { useParams } from 'react-router-dom';
import { GetConversation } from '../../actions/useMessage';
import ErrorPage from '../../pages/shared/ErrorPage';
import LoadingPage from '../../pages/shared/LoadingPage';

const Messages = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>();

    const { isLoading, isError, error, data, failureCount } = GetConversation( userAId!, userBId!);

    if (isError) return (<ErrorPage error={error!} />);

    if (isLoading) return (<LoadingPage failureCount={failureCount} />);

    return <>
    {data! && data.messages?.map((message) => (
        <MessageElement key={data.messages.indexOf(message)}  message={message}/>
        )
    )}</>
}

export default Messages;