import { Navigate } from "react-router-dom";
import spinner from "./assets/images/spinner.svg";

export const Suspense = () => {
    return(
        <div className="modal_container">
            <div className="modal_content">
                <center>
                    <img src={spinner} alt="spinner"/>
                </center>
                <p className="fw-bold text-center my-3">Verifying Authentication...</p>
            </div>
        </div>
    )
}

export const AuthSuspense = ({ is_auth, children }) => {
    if (!is_auth) {
        return <Navigate to="/login" replace />;
    }else if(is_auth === 'suspense') {
        return <Suspense />
    }else{
        return children;
    }
}