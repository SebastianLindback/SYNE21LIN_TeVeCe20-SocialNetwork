import { AxiosError } from "axios";
import React from "react";

interface props {
    error : AxiosError
}

const ErrorPage = ({error} : props) => {

    return (console.log(error),<>
        <div className="row rounded">
            <div className="col-sm bg-danger text-dark font-weight-bold p-4 mb-4 rounded">
                {`An error has occurred: ${error.response?.data ? error.response?.data : error.message}`}
            </div>
        </div>
    </>)
}

export default ErrorPage;