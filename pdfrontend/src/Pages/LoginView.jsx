import studyBg from "../assets/images/study-bg.jpg"
import { Link } from "react-router-dom";
import { LoginForm } from "../Components";

function Loginview() {
    return(
        <>
            <div className="w-100 h-[100vh] grid grid-cols-2 gap-6">
                <div className="w-full h-[inherit]">
                    <img className="h-full w-full object-cover" src={studyBg} alt="" />
                </div>

                <div className="h-full flex justify-center items-center">
                    <div className="grow">
                        <h4>Welcome to StudyChimp, <br />
                            Sign In to continue
                        </h4>
                        <p>Don't have an account, <Link to="/auth/signup" className="underline underline-offset-4 font-semibold">Create an account</Link> 
                            <br /> It takes less than a minute
                        </p>

                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginview;