import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        major: {
            main: "rgb(39, 39, 42)",
            100: "rgb(178,186,194)",
        },
        auxilary : {

        }
    },
    components: {
        /*
        MuiOutlinedInput:{
            styleOverrides: {
                root: {
                    
                },

                notchedOutline: {
                    "& span": {
                        color: "black"
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                focused: {
                    color: "red"
                }
            }
        }
        */
    }
})

export default Theme;