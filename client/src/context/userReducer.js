export default function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isFetching: false,
        error: null,
      };
    case 'UPDATE':
      return {
        ...state,
        user: action.payload,
      };
    default: {
      return state;
    }
  }
}
