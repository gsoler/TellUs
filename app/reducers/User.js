export const SAVE_USER = 'save_user';

export const User = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER: {
      const { user } = action
      return {
        user
      }
    }
    default:
      return state
  }
}