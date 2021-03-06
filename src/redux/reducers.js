import { List } from '@material-ui/core';
import { GET_CONTACTS, GET_INDIVIDUAL_CONTACT } from './actionTypes';

const INITIAL_DATA = [];


const RootReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            let contactList = action.contactList;
            return {
                ...state,
                contactList
            }
        case GET_INDIVIDUAL_CONTACT:
            let contactItem = action.contactItem;
            return {
                ...state,
                contactItem
            }
        default:
            return List;
    }
}

export default RootReducer