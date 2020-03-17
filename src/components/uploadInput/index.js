import React, {useState, useEffect, useReducer} from "react"
import { Input, Label, Form } from "./style"
import axios from 'axios'
import { UploadFileMachine } from "./uploadFileMachine"

const UploadButton = ({
}) => {
  const [file, setFile] = useState(null)

  // const UploadFileReducer = (state, event) => {
  //   const newState = 
  //   (UploadFileMachine.states[state] && UploadFileMachine.states[state].on[event]) || state

  //   return newState
  // }
  // const [state, dispatch] = useReducer(UploadFileReducer, UploadFileMachine.start)

  const handleFile = (e) => {
    let file = e.target.files[0]
    setFile({file: file})
      console.log(e.target.files)
      console.log(e.target.files[0])
  }

  const handleUpload = () => {
    let data = file
    let formData = new FormData()

    formData.append('image', data)
    formData.append('name', "The Cat")
    axios({
      url: 'https://api.thecatapi.com/v1/images/upload',
      method: "POST",
      headers: {
        authorization:'x-api-key: 4527b491-f002-48a2-a7d1-31efcb972861',
      },
      data: formData
    }).then((res)=> {

    })
    console.log(file, 'file')

  }
  return (
    <>
      <form>
        <Label>Choose a file</Label>
        <Input type="file" name="file" onChange={handleFile}/>
        <button 
        type="submit"
        onClick={handleUpload}
        >Submit</button>
      </form>
    </>
  )
}

export default UploadButton;


