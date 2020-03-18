import styled, { keyframes } from "styled-components"

const lightTheme = {
  main: {
    backgroundColor: "#fff",
    textColor: "#000",
    spinDirection: true
  },
  button: {
    general: `
        font-size: 20px;
        cursor: pointer;
      `,
    initial: `
        background-color: #45bec7;
        color: white;
            `,
    hovered: `
        background-color: white;
        color: #45bec7;
        border: 2px solid #45bec7
            `
  }
}

const darkTheme = {
  main: {
    backgroundColor: "#282c34",
    textColor: "#fff",
    hueRotation: 154,
    spinDirection: false
  },
  button: { general: "cursor: pointer;" }
}

const AppHeader = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.main.textColor};
  background-color: ${props => props.theme.main.backgroundColor};
`

const AppLogoSpinForward = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const AppLogoSpinBackward = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`

const ImgContainer = styled.img`
  height: 40vmin;
  pointer-events: none;
  animation: ${props =>
      props.theme.main.spinDirection ? AppLogoSpinForward : AppLogoSpinBackward}
    infinite 20s linear;
  filter: hue-rotate(${props => props.theme.main.hueRotation || 0}deg);
`

export { lightTheme, darkTheme, AppHeader, ImgContainer }
