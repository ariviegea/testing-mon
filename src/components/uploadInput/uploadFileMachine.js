const STATES = {
  INITIAL: "INITIAL",
  SELECTED: "SELECTED",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED"
}

const EVENTS = {
  ClICKED: "CLICKED",
  FETCH: "FETCH",
  RESOLVE: "RESOLVE",
  REJECT: "REJECT",
  TIMEOUT: "TIMEOUT"
}

export const UploadFileMachine = {
  start: STATES.INITIAL,
  states: {
    [STATES.INITIAL]: {
      on: {
        [EVENTS.CLICK]: STATES.SELECTED
      }
    },
    [STATES.SELECTED]:{
      on: {
        [EVENTS.FETCH]: STATES.PENDING
      }
    },
    [STATES.PENDING]: {
      on: {
        [EVENTS.RESOLVE]: STATES.SUCCESS,
        [EVENTS.FAILED]: STATES.FAILED
      }
    },
    [STATES.SUCCESS]: {
      on: {
        [EVENTS.TIMEOUT]: STATES.INITIAL
      }
    },
    [STATES.FAILED]: {
      on: {
        [EVENTS.TIMEOUT]: STATES.SELECTED
      }
    }
  }
}
