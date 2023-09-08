import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { LoginView, SignUpView, Overview, AddBook } from "../Pages"
import ProtectedRoute from "./ProtectedDecorator"

export default function RouteStore() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginView/>} />
                <Route path="/auth/">
                    <Route index path="login" element={<LoginView/>} />
                    <Route path="signup" element={<SignUpView/>} />
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute children={<Overview />} />}/>
                <Route path="/add-book" element={<ProtectedRoute children={<AddBook />} />}/>
            </Routes>
        </Router>
    )
}