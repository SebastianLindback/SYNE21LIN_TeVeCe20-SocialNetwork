import React, { ChangeEvent,  useState } from 'react';
import Agent from '../actions/Agent';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';

const Post = () => {

    const queryClient = useQueryClient()
    const [textAreaValue, settextAreaValue] = useState('');
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
                userId: parseInt(userId ?? '0')
            });
        } 
        ,
        onSuccess: () => {
            queryClient.invalidateQueries(['UserWallData']);
            settextAreaValue('');
        },
    });

    

    return (
        <>
            <div className="row rounded">
                <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                    <h2 className="display-2">Message</h2>

                    <div className="form-group ">
                        <label>Send a message to the users wall</label>
                        <textarea className="form-control form-control-lg"
                            id="message"
                            name="message"
                            onChange={handleInputChange}
                            value={textAreaValue}>
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary "
                        onClick={() => addPostMutation.mutate()}>Send</button>

                </div>
            </div>
        </>
    );
};

export default Post;