import axios from 'axios';

import { GET_CONTACTS, GET_INDIVIDUAL_CONTACT } from './actionTypes';

export const getContacts = (contactList) => ({ type: GET_CONTACTS, contactList });

export const getIndividualContact = (contactItem) => (
    {
        type: GET_INDIVIDUAL_CONTACT,
        contactItem
    });
export function contactListAPI(){
    return(dispatch) =>{
        return axios.get('https://reqres.in/api/users').then((response) => {
            dispatch(getContacts(response.data))
        })
    }
}

export function contactAPI(id){
    return(dispatch) =>{
        return axios.get('https://reqres.in/api/users/'+id).then((response) => {
            dispatch(getIndividualContact(response.data))
        })
    }
}