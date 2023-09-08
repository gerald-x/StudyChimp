import { useTheme } from "@mui/material"

const PrimaryBtn = ({label, addditonalClasses, ...rest})=>{
    const theme = useTheme()
    return(
        <>
            <button 
                className={`bg-black text-white p-2 hover:bg-gray-600 ${addditonalClasses}`} 
                {...rest}
            >
                {label}
            </button>
        </>
    )
}

export {PrimaryBtn}