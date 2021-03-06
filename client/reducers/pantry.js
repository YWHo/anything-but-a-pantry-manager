function receivePantry(state=[], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECEIVE_PANTRY':
      return [...action.pantry]

      case 'DELETE_PANTRY_ITEM':
        return [...newState].filter(ingredient => ingredient.id !== action.ingredient.id)

    default:
        return state
  }
}

export default receivePantry
