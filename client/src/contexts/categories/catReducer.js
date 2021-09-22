export default function catReducer(state, action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return {
        ...state,
        isFetching: true,
      };
    case 'CREATE_CATEGORY':
      return {
        ...state,
        isPosting: true,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
