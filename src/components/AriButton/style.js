import styled from 'styled-components'


const Button = styled.button`
${props => props.bootstrap && `
&:active{
  outline:none;
  border:none;
}
&:focus{
  outline:0;
}
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit;
  }
`}
${props => props.icontext && `
i {margin-right:10px}
`}
${props => !props.bootstrap && `
@keyframes spin1{
  20%{transform: rotate(150deg)}
  40%{transform:rotate(300deg)}
  80%{transform: rotate(300deg)}
  100%{transform:rotate(360deg)}
}

@keyframes spin2{
  0%{transform:rotate(-30deg)}
  20%{transform:rotate(-30deg);
    border-color:transparent transparent #C3C3C3 #C3C3C3 }
  21%{border-color:#41d0a0 #41d0a0 transparent transparent}
  40%{transform:rotate(-30deg)}
  60%{transfrom: rotate(120deg);
  border-color:#41d0a0 #41d0a0 transparent transparent}
  61%{border-color:transparent transparent #C3C3C3 #C3C3C3}
  80%{transform:rotate(270deg)}
  100%{transform:rotate(330deg)}
}
  position:relative;
  background-color:transparent;
  outline: none;
  padding: 0;
  border: none;
  margin: 10px;
  padding: 15px 50px;
  font-size: 20px;
  border-radius: 50px;

  a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit;
  }

  &:active{
    outline:none;
    border:none;
  }
  &:focus{
    outline:0;
  }
  &.initial {
    background-color: #41d0a0;
    color: white;
    border: 1px solid transparent;
  }
  &.hover {
    background-color: white;
    color: #41d0a0;
    border:1px solid #41d0a0;
  }
  &.success {
    background-color: white;
    color: blue;
    border:1px solid blue;
  }
  &.failed {
    background-color: white;
    color: red;
    border:1px solid red;
  }
  &.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 40px;
    height: 40px;
    margin: auto;
    animation: spin 4s linear infinite;
    cursor: auto;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 30px;
      width: 40px;
      height: 40px;
      right: 0px;
      border: 5px solid #c3c3c3;
      border-radius: 50%;
    }

    &:before {
      border-bottom: 5px solid #41d0a0;
      border-left: 5px solid #41d0a0;
      animation: spin1 5s linear infinite;
    }

    &:after {
      border-top: 5px solid transparent;
      border-right: 5px solid transparent;
      animation: spin2 5s linear infinite;
    }`
}

${props => props.theme && props.theme.button}
`
export { Button }