export const initialState = {
    user: null,
    access_module: null,
    token: null

}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ACCESS_MODULE: "SET_ACCESS_MODULE",
    SET_TOKEN: "SET_TOKEN"
};

export const reducer = (state, action) => {
    console.log('before')
    console.log(action)
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.SET_ACCESS_MODULE:
            return {
                ...state,
                access_module: action.access_module
            }
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
};

// export default reducer;