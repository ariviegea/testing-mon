import React, {useState, useEffect, useReducer} from "react"
import { Input, Label, Form } from "./style"
import axios from 'axios'
import { UploadFileMachine } from "./uploadFileMachine"
import { Button } from "mon-dieu-elements"

const UploadButton = ({
}) => {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})

  // const UploadFileReducer = (state, event) => {
  //   const newState = 
  //   (UploadFileMachine.states[state] && UploadFileMachine.states[state].on[event]) || state

  //   return newState
  // }
  // const [state, dispatch] = useReducer(UploadFileReducer, UploadFileMachine.start)
  const handleFile = (e) => {
    let file = e.target.files[0]
    setFile(file)
      console.log(e.target.files)
      console.log(e.target.files[0])
  }


  // const handleUpload = async event => {
    // event.preventDefault()
    // let formData = new FormData()
    // formData.append("file", file)
  //   let response = await axios.post(
  //     "https://api.thecatapi.com/v1/images/upload",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "x-api-key": "4527b491-f002-48a2-a7d1-31efcb972861"
  //       }
  //     }
  //   )
  //   console.log("response", response)
  // }




  const handleUpload = async(e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("file", file)
    // formData.append('WHAT THE API CALLS THE TYPE OF FILE', data)
     // formData.append('name', "The Cat")     
    try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      let response = await axios.post(
        "https://api.thecatapi.com/v1/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "4527b491-f002-48a2-a7d1-31efcb972861"
          }
        }
      )
    console.log(response.data, 'response data')
    const { fileName } = response.data
    setUploadedFile({ fileName })
    console.log(uploadedFile)
    console.log("response", response)
  } catch(err) {
    if(err.response.status === 500) {
      console.log('Server issue')
    } else {
      console.log(err.response.data)
    }
  }
    console.log(file, 'file')
  }

  console.log(uploadedFile)
  return (
    <>
      <form onSubmit={handleUpload}>
        <Label className="labelfile" htmlFor='file'>{filename}</Label>
        <Input className="inputfile" id='file' type="file" name="file" onChange={handleFile}/>
        <Button
        onClick={(e) => handleUpload}
        />
      </form>
    </>
  )
}

export default UploadButton;


