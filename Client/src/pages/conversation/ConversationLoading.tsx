interface props {
    failureCount : number
}

const ConversationLoading = ({failureCount} : props) => {

    return <>
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                <span>
                    Loading...
                    <br />
                    {failureCount > 1 && `Retrying... Number of failed requests: ${failureCount}`}
                </span>
            </div>
        </div>
    </>
}

export default ConversationLoading;