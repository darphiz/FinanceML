import { Link } from "react-router-dom";
import { useAuth } from "../stores";


export const Home = () =>{
    const is_authenticated = useAuth(state => state.is_authenticated);
    const userMail = useAuth(state => state.userMail);

    return (
        
        <div className="container my-5">
        <br />
        <br />
        <br />
            {is_authenticated ?
                <h1 className="text-center">Welcome, {userMail}</h1>
            :
                <h1 className="text-center">Can I get to know you?</h1>
            }
            <center className="my-5">
                {is_authenticated ?
                <Link to='/dashboard' className="btn fw-bold rounded-4 text-white px-5 py-2 bg-dominant">Dashboard</Link>
                :
                <Link to='/login' className="btn fw-bold rounded-4 text-white px-5 py-2 bg-dominant">Login</Link>
                } 
            </center>

        </div>
    )
}