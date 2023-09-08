import { useState } from "react"
import { AdminSideNav, AdminTopNav } from "../Components"

export default function Overview() {
    const [open, setOpen] = useState(false)
    
    return (
        <>
            <AdminSideNav open={open} onToggleHandler={() => setOpen(!open)} />
            <AdminTopNav open={open} onToggleHandler={() => setOpen(!open)} />

        </>
    )
}