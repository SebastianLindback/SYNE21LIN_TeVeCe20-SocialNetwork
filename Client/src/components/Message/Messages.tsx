import Agent from '../../actions/Agent';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import Moment from 'moment';

const Messages = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: [`conversation-${userAId}-${userBId}`],
        queryFn: () =>{
            return Agent.Message.Conversation(userAId, userBId).then(response => response)
        }
    });

    if (isError) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                {`An error has occurred: ${error}`}
            </div>
        </div>
    );    
    
    if (isLoading) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                Loading...
            </div>
        </div>
    );
    if (data.messages.length === 0){
        return <h2>No conversation found</h2>
    }
    return <>
    <h2 className='col-12 text-center'>Your Messages</h2>
    <div className='card col-6 mx-auto m-5 ' >
        <div className='card-header mt-3 row'>
        <p className='card-title col-6'> </p>
        </div>
        <textarea name="replyArea" cols={30} rows={10}></textarea>
        <button className='btn btn-primary col-6'>Reply {data.messages.filter(x => x.senderId!.toString() === userBId) && `to ${ data.messages.filter(x => x.senderId!.toString() === userBId)[0].sender!}`}</button>
    </div>
    {data! && data.messages.map((message) => (
        <div className='card col-6 mx-auto m-5 ' >
                <div className='card-header mt-3 row'>
                    <p className='card-title col-6'>From: <a href={`${process.env.PUBLIC_URL}/user/${message.senderId}`}>{message.sender}</a> </p>
                    <p className='card-subtitle mb-2 text-muted col-6'>To: {message.receiver}</p>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{message.content}</p>
                </div>
                <div className='card-footer row'>
                    <p className='text-muted col-6'>- {Moment(message.createdDate).format("Do MMM YYYY - HH:MM") }</p>
                </div>
                
            </div>
        )
    )}</>
}

export default Messages;