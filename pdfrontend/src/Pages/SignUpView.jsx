import studyBg from "../assets/images/study-bg.jpg"
import { Link } from "react-router-dom";
import { SignUpForm } from "../Components";

export default function SignUpView() {
    return(
        <>
            <div className="w-100 h-[100vh] grid grid-cols-2 gap-6">
                <div className="w-full h-[inherit]">
                    <img className="h-full w-full object-cover" src={studyBg} alt="" />
                </div>

                <div className="h-full w-full pt-12 pb-4 overflow-y-hidden flex flex-col">
                    <div className="">
                        <h4>Welcome to StudyChimp, <br />
                            Sign Up to continue
                        </h4>
                        <p>Already have an account, <Link to="/auth/login" className="underline underline-offset-4 font-semibold">Sign In</Link> 
                        </p>
                    </div>

                    <div className="overflow-y-hidden pt-4">
                        <div className="w-full h-full overflow-y-auto">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}