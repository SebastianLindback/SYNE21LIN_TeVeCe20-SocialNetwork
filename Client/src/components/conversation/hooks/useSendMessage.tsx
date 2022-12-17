import { useMutation, useQueryClient } from "@tanstack/react-query";
import Agent from "../../../actions/Agent";
import { Message } from "../../../models/Message";


interface props {
    queryKey : string[]
}

export default function useSendMessage({queryKey} : props) {
    const queryClient = useQueryClient();
    const sendMessageMutation = useMutation((message : Partial<Message>) => { return Agent.Messages.Send(message)}
    ,
    {
        onSuccess : () => {
            queryClient.invalidateQueries(queryKey);
            queryClient.refetchQueries(queryKey);
        } 
    });
    return sendMessageMutation
}
