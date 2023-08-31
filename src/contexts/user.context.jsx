import { createContext , useEffect, useReducer } from 'react';

import { onAuthStateChangedListener  , createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

import createAction from '../utils/reducer/reducer.utiils';

// context still the context because that value that we expose 
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
}); 

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

const userReducer = (state , action) => {
    // console.log('dispatch');
    // console.log(action);
    
    const { type , payload } = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser : payload
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer`);

    }
}


const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider =  ({ children }) => {

    // const [currentUser , setCurrentUser] = useState(null);
    const[{currentUser} , dispatch] = useReducer(userReducer , INITIAL_STATE);
    // console.log(currentUser);
 
    const setCurrentUser = (user) => 
        // whenever you call it you pass it an action object 
        // if you want a user reducer to recieve an action you have to call it 
        // and will take that action then pass it in where will run through the switch statement and update the reducer 
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER , user));
        
    

   
    const value = {currentUser , setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>

};
