import { useRef, useState } from "react"
import { FileField } from "../Components"
import { AdminTopNav , AdminSideNav, PlainTextField, PrimaryBtn} from "../Components"
import { FormControlLabel, Checkbox } from "@mui/material"

function AddBook() {
    const [open, setOpen] = useState(false)
    const file = useRef(null)
    const [checked, setChecked] = useState(false)

    const handleChecked = (event) => {
        setChecked(event.target.checked)
    }

    return(
        <>
            <AdminSideNav open={open} onToggleHandler={() => setOpen(!open)} />
            <AdminTopNav open={open} onToggleHandler={() => setOpen(!open)} />

            <div className="w-1/2 mt-10 mx-auto">
                <FileField ref={file} />

                <PlainTextField 
                    sx={{
                        width: "100%",
                        mt: 6
                    }}
                    placeholder={`Title of File`}
                    variant="outlined"
                    label="Title of File"
                    type="text"
                />

                <FormControlLabel
                    sx={{
                        width: "100%",
                        my:3
                    }}
                    control={
                        <Checkbox
                            color="major"
                            onChange={handleChecked}
                            checked={checked}
                        />
                    }
                    label={`Make this book visible to the public`}
                />

                <PrimaryBtn
                    label="Submit"
                    addditonalClasses={`w-full py-4`}
                />
            </div>
        </>
    )
}

export default AddBook