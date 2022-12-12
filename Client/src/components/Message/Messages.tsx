import Agent from '../../actions/Agent';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { Message } from '../../models/Message';
import Moment from 'moment';

const Messages = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>();

    const { isLoading, error, data } = useQuery({
        queryFn: () =>{
            return Agent.Message.User(userAId, userBId).then(response => response)
        }
    });

    if (isLoading) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                Loading...
            </div>
        </div>
    );

    if (error) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                {`An error has occurred: ${error}`}
            </div>
        </div>
    );
        const messageDesign = (message : Message) => {
            
            return (
            <div className='card col-6' >
                <div className='card-header mt-3'>
                    <p className='card-title '>From: <a href={`${process.env.PUBLIC_URL}/user/${message.senderId}`}>{message.sender}</a> </p>
                    <p className='card-subtitle mb-2 text-muted'>To: {message.receiver}</p>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{message.content}</p>
                </div>
                <p className='card-footer text-muted'>- {Moment(message.createdDate).format("Do MMM YYYY - HH:MM") }</p>
            </div>
            )
        }
    return (
        <>
           { data && data.messages.map((message) => (
            messageDesign(message)
            )
           )
        }

            
                           
                        
        </>
    );
};

export default Messages;