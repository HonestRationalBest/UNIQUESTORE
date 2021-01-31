
let initialState = {
    usersData: [],
    myData: {
        img: null
    },
    isLoaded: false,
    collections: [],
    usersId: [],
    MyItems: [],
    UsersCollections: []
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                usersData: action.data
            }
        case "SET_MY_DATA":
            return {
                ...state,
                myData: action.myData
            }
        case "SET_AVATAR":
            return {
                ...state,
                img: action.img
            }
        case "SET_MY_COLLECTIONS":
            return {
                ...state,
                collections: action.collections
            }
        case "SET_USERS_ID":
            return {
                ...state,
                usersId: action.usersId
            }
        case "SET_MY_ITEMS":
            return {
                ...state,
                MyItems: action.items
            }
        case "SET_USERS_COLLECTIONS":
            return {
                ...state,
                UsersCollections: action.items
            }
        default:
            return state
    }
};

export default mainReducer;