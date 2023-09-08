import { FormControl, MenuItem, Select, 
    InputLabel, FormHelperText, 
    Box, useTheme, Collapse, Alert, 
    IconButton, AlertTitle
} from "@mui/material"
import { useEffect, useState } from "react"
import CustomTextField from "../Custom/CustomTextField"
import { PrimaryBtn } from "../Ui/Buttons"
import { axiosPost, useFetchChannelName, useFetchPost } from "../../Hooks/useFetchChannel"
import validator from "validator"
import { MdClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
//import { TextField } from "@mui/material"


const SignUpForm = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(null)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(null)
    const [confirm_password, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(null)

    const [faculty, setFaculty] = useState('');
    const [open, setOpen] = useState(false);
    const [alertError, setAlertError] = useState("")

    const handleChange = (event) => {
        setFaculty(event.target.value);
    };

    const checkUsername = (event)=>{
        const username = String(event.target.value).trim()

        if (username === "") {
            setUsernameError("No username detected")
            setUsername("")
        } else if (username !== username.toLowerCase()){
            setUsernameError("Username must be in lowercase")
        } else {
            setUsernameError(null)
            setUsername(username)
        }
        
    }

    const handleSetPassword = (event)=>{
        const pass = event.target.value
        if (pass.trim() === "")
            setPassword("")
        else
            setPassword(pass)
    }

    const handleConfirmPassword = (event)=>{
        setConfirmPassword(event.target.value)
    }

    const submitForm = () => {
        if (!username)
            setUsernameError("Field cannot be blank")

        if (!email)
            setEmailError("Field cannot be blank")

        if (!password)
            setPasswordError("Field cannot be blank")

        if (!confirm_password)
            setConfirmPasswordError("Field cannot be blank")

        if (!(
            usernameError || emailError ||
            passwordError || confirmPasswordError
        ) && (
            username && password &&
            email && confirm_password
        )){
            axiosPost("http://127.0.0.1:8000/user/auth/register/", {
                username: username,
                email: email,
                faculty: faculty,
                password: password,
                confirm_password: confirm_password,
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
                    navigate("/dashboard")
                }
            })
        }
    }

    useEffect(()=>{
        
        if (confirm_password !== password)
            setConfirmPasswordError("Passwords do not match")
        else 
            setConfirmPasswordError(null)    
    
    }, [confirm_password, password])

    useEffect(()=>{
        if (validator.isAlphanumeric(password) && validator.isAlpha(password))
            setPasswordError("Password must be an alphanumeric character. i.e contain numbers")
        else if (password.length <= 6 && password.length > 0)
            setPasswordError("Weak password. You can do better")
        else
            setPasswordError(null)
        
    }, [password])

    const checkEmail = (event)=>{
        const emailValue = String(event.target.value).trim()

        if (emailValue === "") {
            setEmailError("No email detected")
            setEmail("")
        } else {
            setEmailError(null)
            setEmail(emailValue)
        }  
    }

    useEffect(()=>{
        if (email !== ""){
            axiosPost("http://127.0.0.1:8000/user/auth/email-check/", {email: email})
            .then(res => {
                const { loading, response, error } = res
                if (error)
                    setEmailError(error?.response.data.detail)
            })
        }
    }, [email])

    useEffect(()=>{
        axiosPost("http://127.0.0.1:8000/user/auth/username-check/", {username: username})
        .then(res => {
            const { loading, response, error } = res
            if (error)
                setUsernameError(error?.response.data.detail)
        })
    }, [username])
    
    const {channelData: facultyList, error: facultyListError} = useFetchChannelName("http://127.0.0.1:8000/user/auth/faculty-list/")

    return(
        <>
            <div>
            
                <CustomTextField
                    error={usernameError ? true : null}
                    color="primary"
                    size="small" 
                    variant="outlined"
                    label="Username"
                    onChange={checkUsername}
                    value={username}
                    helperText={usernameError && usernameError}
                />

                <CustomTextField
                    error={emailError ? true : null}
                    color="primary"
                    size="small" 
                    variant="outlined"
                    label="Email" 
                    type="email"
                    value={email}
                    onChange={checkEmail}
                    helperText={emailError && emailError}
                />

          
                <CustomTextField
                    error={passwordError ? true : null}
                    color="primary"
                    size="small"
                    id="outlined-adornment-password"
                    type='password'
                    label="password"
                    value={password}
                    onChange={handleSetPassword}
                    helperText={passwordError && passwordError}
                />

                <CustomTextField
                    error={confirmPasswordError ? true : null}
                    color="primary"
                    size="small"
                    id="confirm-password"
                    type='password'
                    label="confirm password"
                    value={confirm_password}
                    onChange={handleConfirmPassword}
                    helperText={confirmPasswordError && confirmPasswordError}
                />

                <Box 
                    sx={{
                        width: "50%",
                        marginX: "auto", 
                        marginY: 3
                    }}                
                >
                    <FormControl sx={{
                        width: "100%",
                        "& label.Mui-focused": {
                            color: "#A0AAB4"
                        }
                    }}>
                        <InputLabel id="faculty">Faculty</InputLabel>
                        <Select
                            color="major"
                            labelId="faculty"
                            id="faculty-helper"
                            value={faculty}
                            label="Faculty"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {facultyList.map((value)=> {
                                return(
                                    <MenuItem key={value.pk} value={value.fields.faculty_name}>{`Faculty of ${value.fields.faculty_name}`}</MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText>Providing a faculty is not compulsory. <br /> It only helps with recommendations</FormHelperText>
                    </FormControl>
                </Box>

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

                <PrimaryBtn label="Submit" addditonalClasses="w-1/2 text-center" onClick={submitForm} />
            </div>
        </>
    )
}

export default SignUpForm