import { alpha, styled } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';

const styles = {
    form: {
        display: "block",
        marginY: 3,
        marginX: "auto",
        width: "50%"
    },
    input: {
        width: "100%"
    }
}

const TextFieldVariants = styled(TextField)((props)=>({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: props.theme.palette.major.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: props.theme.palette.major.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: props.theme.palette.major.main,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: props.theme.palette.major[100],
        },
    },
}))

const CustomTextField = ({ additionalSx={}, ...rest })=>{
    return(
        <FormControl
            sx={{
                ...styles.form
            }}
        >
            <TextFieldVariants sx={{ ...styles.input, ...additionalSx }}  {...rest} />
        </FormControl>
    )
}

const PlainTextField = ({ additionalSx={}, sx={}, ...rest })=>{
    return(
        <FormControl
            sx={sx}
        >
            <TextFieldVariants sx={{ ...styles.input, ...additionalSx }}  {...rest} />
        </FormControl>
    )
}

export default CustomTextField;
export { PlainTextField };