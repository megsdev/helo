const initialState = {
    id: 0,
    username: '',
    profilePic: ''
}

const UPDATE_USER_INFO = "UPDATE_USER_INFO"

function reducer( state = initialState, action) {
    console.log('this is action.payload', action.payload)
    switch(action.type) {
        case UPDATE_USER_INFO:
            return Object.assign( {}, state, {id: action.payload.id, username: action.payload.username, profilePic: action.payload.profilePic})        
        default: return state

    }
}


//action builders
export function updateUserInfo( id, username, profilePic ) {
    return {
        type: UPDATE_USER_INFO,
        payload: { id, username, profilePic }
    }
}

export default reducer