import React, { useReducer, useEffect } from 'react'
import { withTheme } from 'styled-components'
import { Button } from './style'


const AriButton = ({
  texts = {},
  btnStyles = {},
  onClick = () => {},
  disabled = false,
  enableOnClick = false,
  initialStateClick,
  onClickValue = { event: null },
  bootstrap,
  btnSizes = 'btn-lg',
  btnType = 'button',
  btnBlock = false,
  icon = false,
  icontext = false,
  iconsize = "fa-lg",
  iconclassname = "fas fa-user-astronaut",
  iconrotateorflip="fa-rotate-90",
  href,
  arialabel,
  stateTime,
  ...rest
}) => {
  /* Situation on the loading button */
  const { initialtext = 'Initial', hovertext = 'Hover', successtext = 'Success', failedtext = 'Failed', loadingtext = 'Loading...' } = texts
  const { btnInitial = 'btn-primary', btnHover = 'btn-primary', btnSuccess = 'btn-success', btnFailed = 'btn-danger', btnLoading = 'btn-warning' } = btnStyles

  const states = {
    INITIAL: 'INITIAL',
    HOVER: 'HOVER',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
  }

  const events = {
    MOUSEOVER: 'MOUSEOVER',
    MOUSELEAVE: 'MOUSELEAVE',
    CLICKED: 'CLICKED',
    SUCCESSFULL: 'SUCCESSFULL',
    FAILED: 'FAILED',
    TIMEOUT: 'TIMEOUT'
  }

  const classes = {
    [states.INITIAL]: bootstrap ? `${btnInitial} ${btnSizes} ${btnType} ${btnBlock ? 'btn-block' : ''}` : 'initial',
    [states.HOVER]: bootstrap ? `${btnHover} ${btnSizes} ${btnType} ${btnBlock ? 'btn-block' : ''}` : 'hover',
    [states.LOADING]: bootstrap ? `${btnLoading} ${btnSizes} ${btnType} ${btnBlock ? 'btn-block' : ''}` : 'loading',
    [states.SUCCESS]: bootstrap ? `${btnSuccess} ${btnSizes} ${btnType} ${btnBlock ? 'btn-block' : ''}` : 'success',
    [states.FAILED]: bootstrap ? `${btnFailed} ${btnSizes} ${btnType} ${btnBlock ? 'btn-block' : ''}` : 'failed'
  }

  const text = {
    [states.INITIAL]: initialtext || 'Initial',
    [states.HOVER]: hovertext || 'Hover',
    [states.LOADING]: bootstrap ? loadingtext : '',
    [states.SUCCESS]: successtext || 'Success',
    [states.FAILED]: failedtext || 'Failed'
  }


  const exMachine = {
    initial: states.INITIAL,
    states: {
      [states.INITIAL]: {
        on: {
          [events.MOUSEOVER]: states.HOVER
        }
      },
      [states.HOVER]: {
        on: {
          [events.MOUSELEAVE]: states.INITIAL,
          [events.CLICKED]: enableOnClick ? states.LOADING : states.HOVER
        }
      },
      [states.LOADING]: {
        on: {
          [events.SUCCESSFULL]: states.SUCCESS,
          [events.FAILED]: states.FAILED
        }
      },
      [states.SUCCESS]: {
        on: {
          [events.CLICKED]: states.HOVER,
          [events.TIMEOUT]: states.INITIAL
        }
      },
      [states.FAILED]: {
        on: {
          [events.CLICKED]: states.HOVER,
          [events.TIMEOUT]: states.INITIAL
        }
      }
    }
  }

  // const exReducer = (state, event) => {
  //   return (exMachine.states[state] && exMachine.states[state].on[event]) || state
  // }

  let clickTimer
  const exReducer = (state, event) => {
    const newState =
      (exMachine.states[state] && exMachine.states[state].on[event]) || state
    if (
      initialStateClick &&
      (newState === states.SUCCESS || newState === states.FAILED)
    ) {
      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => {
        dispatch(events.TIMEOUT)
      },stateTime)
    }
    return newState
  }

  const [state, dispatch] = useReducer(exReducer, exMachine.initial);

  useEffect(() => {
    if (onClickValue.event) {
      dispatch(events[onClickValue.event])
    }
  }, [onClickValue]);

  return (
    <>
      <Button
        bootstrap={bootstrap}
        className={classes[state]}
        onMouseOver={() => {
          if (state === states.INITIAL) {
            dispatch(events.MOUSEOVER)
          }
        }}
        onMouseLeave={() => {
          dispatch(events.MOUSELEAVE)
        }}
        onClick={() => {
          dispatch(events.CLICKED)
          onClick()
        }}
        disabled={disabled || state === states.LOADING}
        icontext={icontext}
        {...rest}
      >

        { 
        state === states.LOADING ? ''
        : (icontext ? 
          <a href={href} className='icontext' aria-label={arialabel}>
           <i className={`${iconclassname} ${iconsize} ${iconrotateorflip}`}/>
           {text[state]}
          </a>
        : (icon ? 
            <a href={href} className='icontext' aria-label={arialabel}>
            <i className={`${iconclassname} ${iconsize} ${iconrotateorflip}`}></i></a> 
            : text[state])) 
        }
    
      </Button>
    </>
  )
}

export default AriButton
//     {text[state] && <i className={iconclassname}>{text[state]}</i>}