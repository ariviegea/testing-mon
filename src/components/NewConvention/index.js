import React, { useReducer, useEffect } from "react";
import { withTheme } from "styled-components";

import { Button } from "./style";

const OurButton = ({
  texts = {},
  selections = {},
  booleans = {},
  onClick = () => { },
  async = false,
  externalEvent = { EVENT: null, timeStamp: 0 },
  ...rest
}) => {

  const STATES = {
    INITIAL: 'INITIAL',
    PENDING: 'PENDING',
    HOVERED: 'HOVERED',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
  }

  const EVENTS = {
    CLICK: 'CLICK',
    MOUSEOVER: 'MOUSEOVER',
    MOUSELEAVE: 'MOUSELEAVE',
    RESOLVE: 'RESOLVE',
    REJECT: 'REJECT'
  }

  const ButtonMachine = {
    start: STATES.INITIAL,
    states: {
      [STATES.INITIAL]: {
        on: {
          [EVENTS.MOUSEOVER]: STATES.HOVERED,
        }
      },
      [STATES.HOVERED]: {
        on: {
          [EVENTS.MOUSELEAVE]: STATES.INITIAL,
          [EVENTS.CLICK]: async ? STATES.PENDING : STATES.HOVERED
        }
      },
      [STATES.PENDING]: {
        //here im unsure, but basically I want to listen to the pending and if its successful return success, otherwise return error
        on: {
          [EVENTS.REJECT]: STATES.FAILED,
          [EVENTS.RESOLVE]: STATES.SUCCESS,
        }
      },
      [STATES.SUCCESS]: {
        on: {
          [EVENTS.CLICK]: STATES.HOVERED,
          //Do we need to maybe add mouseover on these button states too?
        }
      },
      [STATES.FAILED]: {
        on: {
          [EVENTS.CLICK]: STATES.HOVERED
          //Do we need to maybe add mouseover on these button states too?
        }
      }
    }
  }

  const ButtonReducer = (state, event) => {
    console.log('event!', event)
    console.log('state', state)

    console.log((ButtonMachine.states[state] && ButtonMachine.states[state].on[event]) || state)
    return (ButtonMachine.states[state] && ButtonMachine.states[state].on[event]) || state
  }

  const { atInitialText, atSuccessText, atFailedText, atHoveredText } = texts
  const buttonText = {
    [STATES.INITIAL]: atInitialText || 'Submit',
    [STATES.HOVERED]: atHoveredText || 'Hovered',
    [STATES.SUCCESS]: atSuccessText || 'Success!',
    [STATES.FAILED]: atFailedText || 'Error!'
  }
  const { bootstrap, blocks, enableOnClick, disabled } = booleans

  console.log(booleans, 'booleans for Ari');

  console.log('selectiaaaaons', selections)
  const { atInitialStyle, atHoveredStyle, atSuccessStyle, atFailedStyle, size, spinner, type } = selections
  const buttonClasses = {
    [STATES.INITIAL]: bootstrap ? `${atInitialStyle} ${size} ${type}` : 'initial',
    [STATES.HOVERED]: bootstrap ? `${atHoveredStyle} ${size} ${type}` : 'hovered',
    [STATES.PENDING]: bootstrap ? spinner : 'pending',
    [STATES.SUCCESS]: bootstrap ? `${atSuccessStyle} ${size} ${type}` : 'success',
    [STATES.FAILED]: bootstrap ? `${atFailedStyle} ${size} ${type}` : 'failed'
  }

  const [state, dispatch] = useReducer(ButtonReducer, ButtonMachine.start)

  useEffect(() => {
    if (externalEvent.EVENT) {
      dispatch(EVENTS[externalEvent.EVENT])
    }
  }, [externalEvent])


  return (
    <Button
      bootstrap={bootstrap}
      className={buttonClasses[state]}
      onMouseOver={() => {
        if (state === STATES.INITIAL) {
          dispatch(EVENTS.MOUSEOVER)
        }
      }}
      onMouseLeave={() => dispatch(EVENTS.MOUSELEAVE)}
      onClick={() => {
        dispatch(EVENTS.CLICK)
        onClick()
      }}
      {...rest}
      disabled={disabled}
    >
      {buttonText[state]}
    </Button>
  )
};
export default withTheme(OurButton);
