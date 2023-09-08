import FormControl from "@mui/material/FormControl"
import { Collapse, Alert, IconButton } from "@mui/material"
import { useState } from "react"
//import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import CustomTextField from "../Custom/CustomTextField"
import { PrimaryBtn } from "../Ui/Buttons"
import { MdClose } from "react-icons/md"
import { axiosPost } from "../../Hooks/useFetchChannel"
import { useNavigate } from "react-router-dom"


const LoginForm = () => {
    const navigate = useNavigate()
    const [identity, setIdentity] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false)
    const [alertError, setAlertError] = useState(null)

    const submitForm = () => {
        if (identity && password){
            if (identity.trim() !== ""){
            axiosPost("http://127.0.0.1:8000/user/auth/login/", {
                identity: identity,
                password: password,
            })
            .then(res => {
                const { loading, response, error } = res
                if (error) {
                    setAlertError(error?.response.data.detail)
                    setOpen(true)
                }

                if (response){
                    localStorage.setItem("access_token", response?.access)
                    localStorage.setItem("refresh_token", response?.refresh)
                    console.log(response)
                    navigate("/dashboard")
                }
            })
            }
        }
    }

    const handleSetIdentity = (event) => {
        setIdentity(event.target.value)
    }

    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }

    return(
        <>
            <div>
                
                <CustomTextField
                    size="small" 
                    variant="outlined"
                    label="Username or Email"
                    value={identity}
                    onChange={handleSetIdentity}
                />

                <CustomTextField
                    size="small"
                    id="outlined-adornment-password"
                    type='password'
                    label="password"
                    value={password}
                    onChange={handleSetPassword}
                />

                <Collapse in={open}
                    sx={{
                        width: "50%",
                        marginY: 3,
                        marginX: "auto"
                    }}
                >
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                            <MdClose fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {alertError}
                    </Alert>
                </Collapse>

                <PrimaryBtn type="button" onClick={submitForm} label="Submit" addditonalClasses="w-1/2 text-center" />
            </div>
        </>
    )
}

export default LoginForm