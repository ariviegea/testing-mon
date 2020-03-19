import React, { useState, useEffect } from "react"
import { Loading, Button } from "mon-dieu-elements"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, AppHeader, ImgContainer } from "./themeStuff"
import logo from "./logo.svg"
import "./App.css"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0)
  const [theme, setTheme] = useState(true)
  useEffect(() => {
    if (percentage < 100) {
      setTimeout(() => {
        setPercentage(old => old + 1)
      }, 10)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 200)
    }
  }, [percentage])
  return (
    // THIS LINE IS THE IMPORTANT PART TO PASS THE THEME DOWN TO OUR STUFF - IT'S THAT EASY
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <div className='App'>
        <AppHeader>
          {loading ? (
            <>
              <Loading />
              <p>{`${percentage}% loaded`}</p>
            </>
          ) : (
            <>
              <ImgContainer src={logo} alt='logo' />
              <p>Stuff is changing</p>
              <Button
                onClick={() => {
                  setTheme(old => !old)
                }}
              >
                Toggle mode
              </Button>
              <div id='very-specific'>
                <Button>This should use extra css</Button>
              </div>
            </>
          )}
        </AppHeader>
      </div>
    </ThemeProvider>
  )
}

export default App
