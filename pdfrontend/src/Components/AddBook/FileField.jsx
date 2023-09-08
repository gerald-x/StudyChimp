import { forwardRef, useRef, useState } from "react"
import { FaPlus } from "react-icons/fa"

const FileField = forwardRef(({}, ref)=>{
    const fileRef = useRef(null)
    const [fileName, setFileName] = useState(null)
    
    const handleClick = ()=>{
        fileRef.current.click()
    }

    const changeName = ()=>{
        const file = fileRef.current.files[0]
        console.log(file)
        setFileName(file?.name !== undefined ? file.name : null)
    }

    return(
        <>
            <div onClick={handleClick} className="w-full h-[20vh] bg-gray-100 hover:bg-gray-200 rounded-2xl flex flex-col justify-center items-center">
                <input ref={fileRef} type="file" className="hidden" accept=".pdf, .doc, .docx" onChange={changeName} />
                
                {
                    !fileName && (
                        <div className="">
                            <FaPlus />
                        </div>
                    )
                }

                <p className="text-center mt-4">{fileName ? fileName : `Add File`}</p>
            </div>
        </>
    )
})

export default FileField