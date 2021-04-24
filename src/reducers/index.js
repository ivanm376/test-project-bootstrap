import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter,
  count: (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT_COUNT':
        return state + 1
      default:
        return state
    }
  },
})
