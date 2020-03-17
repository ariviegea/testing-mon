import React, { useReducer, useEffect } from "react";
import { withTheme } from "styled-components";

import { Button } from "./style";

const OurButton = ({
  texts = {},
  bootstrapStyle = {},
  booleans = {},
  iconValue = {},
  onClick = () => {},
  onClickValue = { EVENT: null, timestamp: 0 },
  disabled = false,
  ...rest
}) => {
  const {
    bootstrap = false,
    async = false,
    redirectClick = false,
    redirectClickTime
  } = booleans;

  const {
    atInitialText = "Initial",
    atHoveredText = "Hover",
    atSuccessText = "Success",
    atFailedText = "Failed"
  } = texts;

  const {
    atInitialStyle = "btn-primary",
    atHoveredStyle = "btn-primary",
    atSuccessStyle = "btn-success",
    atFailedStyle = "btn-danger",
    size = "btn-lg",
    spinner = "spinner-border text-primary",
    type = ""
  } = bootstrapStyle;

  const {
    atInitialElement,
    atHoveredElement,
    atSuccessElement,
    atFailedElement
  } = iconValue;

  const STATES = {
    INITIAL: "INITIAL",
    PENDING: "PENDING",
    HOVERED: "HOVERED",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
  };

  const EVENTS = {
    CLICK: "CLICK",
    MOUSEOVER: "MOUSEOVER",
    MOUSELEAVE: "MOUSELEAVE",
    RESOLVE: "RESOLVE",
    REJECT: "REJECT",
    TIMEOUT: "TIMEOUT"
  };

  const ButtonMachine = {
    start: STATES.INITIAL,
    states: {
      [STATES.INITIAL]: {
        on: {
          [EVENTS.MOUSEOVER]: STATES.HOVERED
        }
      },
      [STATES.HOVERED]: {
        on: {
          [EVENTS.MOUSELEAVE]: STATES.INITIAL,
          [EVENTS.CLICK]: async ? STATES.PENDING : STATES.HOVERED
        }
      },
      [STATES.PENDING]: {
        on: {
          [EVENTS.REJECT]: STATES.FAILED,
          [EVENTS.RESOLVE]: STATES.SUCCESS
        }
      },
      [STATES.SUCCESS]: {
        on: {
          [EVENTS.CLICK]: STATES.HOVERED,
          [EVENTS.TIMEOUT]: STATES.INITIAL
        }
      },
      [STATES.FAILED]: {
        on: {
          [EVENTS.CLICK]: STATES.HOVERED,
          [EVENTS.TIMEOUT]: STATES.INITIAL
        }
      }
    }
  };

  let clickTimer;
  const ButtonReducer = (state, event) => {
    const newState =
      (ButtonMachine.states[state] && ButtonMachine.states[state].on[event]) ||
      state;
    console.log(newState);
    if (
      redirectClick &&
      (newState === STATES.SUCCESS || newState === STATES.FAILED)
    ) {
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        dispatch(EVENTS.TIMEOUT);
      }, redirectClickTime);
    }
    return newState;
  };

  const buttonText = {
    [STATES.INITIAL]: atInitialElement || atInitialText || "Submit",
    [STATES.HOVERED]: atHoveredElement || atHoveredText || "Submit",
    [STATES.SUCCESS]: atSuccessElement || atSuccessText || "Success!",
    [STATES.FAILED]: atFailedElement || atFailedText || "Error!"
  };

  const buttonClasses = {
    [STATES.INITIAL]: bootstrap
      ? `${atInitialStyle} ${size} ${type}`
      : "initial",
    [STATES.HOVERED]: bootstrap
      ? `${atHoveredStyle} ${size} ${type}`
      : "hovered",
    [STATES.PENDING]: bootstrap ? spinner : "pending",
    [STATES.SUCCESS]: bootstrap
      ? `${atSuccessStyle} ${size} ${type} `
      : "success",
    [STATES.FAILED]: bootstrap ? `${atFailedStyle} ${size} ${type}` : "failed"
  };

  const [state, dispatch] = useReducer(ButtonReducer, ButtonMachine.start);

  useEffect(() => {
    if (onClickValue.EVENT) {
      dispatch(EVENTS[onClickValue.EVENT]);
    }
  }, [onClickValue]);

  return (
    <Button
      bootstrap={bootstrap}
      className={buttonClasses[state]}
      onMouseOver={() => {
        if (state === STATES.INITIAL) {
          dispatch(EVENTS.MOUSEOVER);
        }
      }}
      onMouseLeave={() => dispatch(EVENTS.MOUSELEAVE)}
      onClick={() => {
        dispatch(EVENTS.CLICK);
        onClick();
      }}
      {...rest}
      disabled={disabled || state === STATES.PENDING}
    >
      {buttonText[state]}
    </Button>
  );
};
export default withTheme(OurButton);
