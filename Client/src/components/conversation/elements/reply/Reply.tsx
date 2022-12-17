import { useState } from "react";
import { useParams } from "react-router-dom";
import useSendMessage from "../../hooks/useSendMessage";
interface props {
    title : string,
    buttonText : string,
    queryKey: string[]
}

const Reply = ({title, buttonText, queryKey} : props) => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>(); 
    const [content, setContent] = useState("")
    const {mutate : sendMessage} = useSendMessage({queryKey})
    
    const submitMessage = () => {
        sendMessage({
            senderId : +userAId!,
            receiverId : +userBId!,
            content : content
        },
        {
            onSuccess : () => {
                setContent("");
            }
        });
        
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    return <>
        <div className='card col-6 mx-auto m-5 ' >
            <div className='card-header mt-3 row'>
                <p className='card-title col-12'>{title}</p>
            </div>
            <textarea onChange={handleChange} value={content} name="replyArea" cols={30} rows={10}></textarea>
            <button className='btn btn-primary col-6' onClick={submitMessage}>{buttonText}</button>
        </div>
    </>
}

export default Reply;