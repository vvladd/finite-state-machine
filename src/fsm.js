class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (config) {
      this.configStates = config.states;
      this.initState = config.initial;
      this.curState = this.initState;
      this.prevState = null;
      this.undoState = [];
    } else {
      throw new Error();
    }
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.curState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (this.configStates[state]) {
      this.prevState = this.curState;
      this.curState = state;
    } else {
      throw new Error();
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    this.changeState(this.configStates[this.curState].transitions[event]);
    this.undoState.length = 0;
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.curState = this.initState;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    let states = [];
    if (event) {
      for (let key in this.configStates) {
        if (event in this.configStates[key].transitions) states.push(key);
      }
    } else {
      for (let key in this.configStates) {
        states.push(key);
      }
    }
    return states;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.curState === this.initState) {
      return false;
    } else {
      this.undoState.push(this.curState);
      this.changeState(this.prevState);
      return true;
    }
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.undoState.length) {
      this.changeState(this.undoState.pop());
      return true;
    } else {
      return false;
    }
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.prevState = this.initState;
    this.curState = this.initState;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
