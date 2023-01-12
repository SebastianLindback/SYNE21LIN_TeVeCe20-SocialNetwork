import { useState } from "react";
import { useParams } from "react-router-dom";
import { GetConversation, GetQueryKey_Conversation, SendMessage } from "../../actions/useMessage";
import React from "react";

interface button {
    title:string,
    text:string,
    disabled : boolean
}

const ReplyForm = () => {
    const { userAId, userBId } = useParams<{ userAId: string, userBId: string }>(); 
    const [content, setContent] = useState("")
    
    const querykey = GetQueryKey_Conversation(userAId!, userBId!);
    const {mutate : sendMessage} = SendMessage(querykey)
    
    const {data} = GetConversation(userAId!, userBId!)

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
    
    var nameOfRecipient = data?.usersInConversation && data!.usersInConversation!.find(x => x.id === +userBId!)!.name!;
    var btn : button = {
        title : "User not found",
        text : "Error",
        disabled: true
    }
    if (nameOfRecipient){
    btn.title = `Start your conversation with ${nameOfRecipient}`;
    btn.text = "Send"
    btn.disabled= false;
    }
    if (data?.messages!.length! > 0){
        btn.title = `Continue your conversation with ${nameOfRecipient}`;
        btn.text = "Reply";
        btn.disabled= false;
    }
    return <>
        <div className='card col-6 mx-auto m-5 ' >
            <div className='card-header mt-3 row'>
                <p className='card-title col-12'>{btn.title}</p>
            </div>
            <textarea onChange={handleChange} value={content} name="replyArea" cols={30} rows={10}></textarea>
            <button disabled={btn.disabled} className='btn btn-primary col-6' onClick={submitMessage}>{btn.text}</button>
        </div>
    </>
}

export default ReplyForm;