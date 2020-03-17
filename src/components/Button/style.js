import styled from "styled-components";
let Button = styled.button`
${props =>
  props.bootstrap &&
  `

&:focus{
outline: 0;
}
`}

${props =>
  !props.bootstrap &&
  `
/*
failed:
rgb(174, 74, 74);
rgb(174, 74, 74);
rgb(174, 74, 74);

success + borders:
#1ecd97
#1ecd97
#1ecd97
#1ecd97
#1ecd97
#1ecd97
#1ecd97
*/

@keyframes rotate {
  0%{transform: rotate(360deg)}
}

@keyframes bounce {
  0%{transform: scale(0.9)}
}

    display: inline-block;
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  outline: none;

  /* */
  transition: all ease 0.6s;
&.initial {
 border: 2px solid #45bec7;
  color: #45bec7;
  background-color: white;
    ${
      "" /* display: inline-block;
  width: 220px;
  height: 60px;
  border: 2px solid #45bec7;
  color: #45bec7;

  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: white;;
  outline: none;
  transition: all ease 0.6s;

  */
    }
}

&:active{
outline: none;
border: none
}
&:focus{
outline: 0;
}
&.hovered{
  opacity:1;
  color: white;
  background: #45bec7;
}


${"" /* &.initial:hover{
  opacity:1;
  color: white;
  background: #45bec7;
} */}

&.hovered:active{
  letter-spacing: 2px;
}

&.hovered:after{
  content: ''
}



&.pending{
  display: inline-block;
  width: 220px;
  height: 60px;
  border: 2px solid #fff;
  color: #45bec7;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: transparent;
  outline: none;

  /* */
  transition: all ease 0.6s;
  font-size: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color:  #45bec7;
  animation: rotate 1s ease 0.6s infinite
}


&.success{
  display: inline-block;
  width: 220px;
  height: 60px;
  border: 2px solid #45bec7;
  color:   white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: #45bec7;
  outline: none;
  background-color: #B3CF32;
  transition: all ease 0.5s;
  position: relative;
  animation: bounce .3s ease-in;
}


&.success:before{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 31px;
  height: 31px;
  line-height: 31px;
  top: 8px;
}


&.failed {
  display: inline-block;
  width: 220px;
  height: 60px;
  border: 2px solid #e57e32;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50px;
  background:#e57e32;
  background-color:#e57e32;
  outline: none;

  /* */
  transition: all ease 0.5s;
  position: relative;

  animation: bounce .3s ease-in;

}

&.failed:after{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 31px;
  height: 31px;
  line-height: 31px;
  top: 8px;
    }`}
${props => props.theme && props.theme.button}
`;

export { Button };
