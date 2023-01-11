import React, { ChangeEvent,  useState } from 'react';
import Agent from '../../actions/Agent';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

enum btnStates {
    neutral = "send",
    success = "sent"
}

const CreatePostForm = () => {

    const queryClient = useQueryClient()
    const [textAreaValue, settextAreaValue] = useState('');
    const [btn, setBtn] = useState<btnStates | string>(btnStates.neutral)
    const { userId } = useParams<{ userId: string }>();
    
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        settextAreaValue(event.target.value);
    };

    const addPostMutation = useMutation({
        mutationFn: () => {
            return Agent.Posts.Save( {
                id: 0,
                message: textAreaValue,
                createdDate: new Date(),
                senderId: parseInt(userId ?? '0')
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['UserWallData']);
            settextAreaValue('');
            setBtn(btnStates.success)
        },
        onError : (error : AxiosError) => {
            setBtn(error.message)
        }
    });

    

    return (
        <>
            <div className="row rounded">
                <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                    <h2 className="display-2">Post</h2>

                    <div className="form-group ">
                        <label>Create a public post on this wall</label>
                        <textarea className="form-control form-control-lg"
                            id="message"
                            name="message"
                            onChange={handleInputChange}
                            value={textAreaValue}>
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary " style={btn === btnStates.success ? {backgroundColor:"green"} : btn !== btnStates.neutral ? {backgroundColor:"red"} : {}}
                        onClick={() => addPostMutation.mutate()}>{btn}</button>

                </div>
            </div>
        </>
    );
};

export default CreatePostForm;