// let localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

let localLoggedinUser = (sessionStorage.user) ? JSON.parse(sessionStorage.user) : null

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER': 
      const loginUser = action.loggedInUser
      return { ...state, loggedInUser: loginUser };

    case 'USER_REMOVE':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    default:
      return state;
  }
}
