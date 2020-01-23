
const logInUser = (
    state = {
        user: {}
    },
    action) => {
        if(action.type === "LOGIN_USER"){
            state={...state, user: action.payload}
        }
        return state;
    };

export default logInUser;