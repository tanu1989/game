/**
 * [makeAction description]
 * @param  {string} namespace - Application namespace, general namespace
 * @param  {string} action - Name of action described
 *
 * @return {string} a namespaced, uppercased action constant
 */
function makeAction(namespace = '', action = '') {
    return `${namespace}/${action.toUpperCase()}`
  }
  
  /**
   * [makeActions description]
   * Produces an object of actions, with the keys being the action
   * name and the values being the actions namespaced
   *
   * @param  {string} namespace - Application namespace, general namespace
   * @param  {string} actions - Names of actions described
   *
   * @return {object} - Object of actions that describe an async operation
   */
  function makeActions(namespace, actions = []) {
    if (Array.isArray(actions)) {
      return actions.reduce(
        (obj, action) => Object.assign({ [action]: makeAction(namespace, action) }, obj),
  
        {}
      )
    }
  
    console.error('Actions must be an array.')
    return null
  }
  
  /**
   * [makeAsyncAction description]
   * Produces an async action (an object) that consists of 3 normal actions:
   * IN_PROGRESS, SUCCESS, FAIL
   *
   * @param  {string} namespace - Application namespace, general namespace
   * @param  {string[]} action - Name of action described
   *
   * @return {object} - Object of actions that describe an async operation
   */
  function makeAsyncAction(namespace, action) {
    if (!namespace) {
      console.warn('Please provide a namespace for your actions')
    }
    return makeActions(`${namespace}/${action.toUpperCase()}`, [
      'INVALID',
      'IN_PROGRESS',
      'SUCCESS',
      'FAIL',
    ])
  }
  
  /**
   * [makeAsyncActions description]
   * Produces an object of multiple async actions, with the keys being the action
   * name and the values being the actions namespaced
   *
   * @param  {string} namespace - Application namespace, general namespace
   * @param  {string[]} actions - Names of actions described
   *
   * @return {object} - Object of multiple sets of actions that describe async operations
   */
  function makeAsyncActions(namespace, actions = []) {
    if (Array.isArray(actions)) {
      return actions.reduce(
        (newActions, action) =>
          Object.assign({ [action]: makeAsyncAction(namespace, action) }, newActions),
        {}
      )
    }
  
    console.error('Actions must be an array.')
    return null
  }
  
  export { makeAction, makeActions, makeAsyncAction, makeAsyncActions }
  