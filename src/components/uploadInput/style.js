import styled from 'styled-components'

let Input = styled.input `
  
&.inputfile{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

${ props => props.theme && props.theme.div}


`
let Label = styled.label `
font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  outline: none;
  padding: 10px;
&.labelfile {
color: white;
background-color: #45bec7;
display: inline-block;
border: 1px solid transparent;

&:hover {
  color: #45bec7;
  background-color: white;
  border: 1px solid #45bec7;
}

&:focus {
	outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}
}

${ props => props.theme && props.theme.div}

`

const Form = styled.form `
  
border: 0.5px solid black;
padding:5px;

${ props => props.theme && props.theme.div}


`

export { Input, Label, Form }
