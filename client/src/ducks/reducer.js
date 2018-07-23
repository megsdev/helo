const initialState = {
    username: '',
    profilePic: ''
}

const UPDATE_USER_INFO = "UPDATE_USER_INFO"

function reducer( state = initialState, action) {
    console.log('this is action.payload', action.payload)
    switch(action.type) {
        case UPDATE_USER_INFO:
            return Object.assign( {}, state, {username: action.payload.username, profilePic: action.payload.profilePic})        
        default: return state

    }
}


//action builders
export function updateUserInfo( username, profilePic ) {
    return {
        type: UPDATE_USER_INFO,
        payload: { username, profilePic }
    }
}

export default reducer