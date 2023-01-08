import { useParams } from "react-router-dom";
import Reply from "./elements/reply/Reply";
import Messages from "./elements/messages/Messages";
import ConversationError from "./ConversationError";
import ConversationLoading from "./ConversationLoading";
import useConversation from "./hooks/useConversation";

const Conversation = () => {
  const { userAId, userBId } = useParams<{
    userAId: string;
    userBId: string;
  }>();

  const { isLoading, isError, error, data, failureCount, queryKey } =
    useConversation({ userAId: userAId!, userBId: userBId! });

  if (isError) return <ConversationError error={error!} />;

  if (isLoading) return <ConversationLoading failureCount={failureCount} />;

  var nameOfRecipient =
    data?.usersInConversation &&
    data!.usersInConversation!.find((x) => x.id === +userBId!)!.name!;
  var isNewConversation = data?.messages?.length === 0;

  if (isNewConversation) {
    return (
      <>
        <link rel="stylesheet" href={require("./css/MessageStyle.css")} />
        <div className="MessageReply">
          <div className="ProfileInfo">
            <div>
              <img
                className="mr-3 rounded-circle"
                src={require("./css/profile.png")}
              />
            </div>
            <div>
              <h3>Message conversation with:</h3>
              <h2>Johnny Cage</h2>
            </div>
            <div>
              <button>Follow</button>
            </div>
          </div>
          <Reply
            title={`Start a new conversation with ${
              nameOfRecipient && nameOfRecipient
            }`}
            buttonText={"Send"}
            queryKey={queryKey}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <link rel="stylesheet" href={require("./css/MessageStyle.css")} />
      <div className="MessageReply">
        <div className="ProfileInfo">
          <div>
            <img
              className="mr-3 rounded-circle"
              src={require("./css/profile.png")}
            />
          </div>
          <div>
            <h3>Message conversation with:</h3>
            <h2>Johnny Cage</h2>
          </div>
          <div>
            <button>Follow</button>
          </div>
        </div>
        <Reply
          title={`Continue your conversation with ${
            nameOfRecipient && nameOfRecipient
          }`}
          buttonText={"Reply"}
          queryKey={queryKey}
        />

        <Messages response={data!} />
      </div>
    </>
  );
};

export default Conversation;
