import axios from 'axios';

import { GET_CONTACTS, GET_INDIVIDUAL_CONTACT, GET_FAV_CONTACT, SET_FAV_CONTACT } from './actionTypes';

export const getContacts = (contactList) => ({ type: GET_CONTACTS, contactList });

export const getIndividualContact = (contactItem) => (
    {
        type: GET_INDIVIDUAL_CONTACT,
        contactItem
    });
export const getFavourites = (favouriteList) => ({ type: GET_FAV_CONTACT, favouriteList });
export const setFavourites = (favouriteList) => ({ type: SET_FAV_CONTACT, favouriteList });

export function contactListAPI() {
    return (dispatch) => {
        return axios.get('https://reqres.in/api/users').then((response) => {
            dispatch(getContacts(response.data))
        })
    }
}

export function contactAPI(id) {
    return (dispatch) => {
        return axios.get('https://reqres.in/api/users/' + id).then((response) => {
            dispatch(getIndividualContact(response.data))
        })
    }
}

export function saveToLocalStorage(state) {
    // debugger;
    // try {

    //     // const serializedState = JSON.stringify(state);
    //     // localStorage.setItem("state",serializedState);
    //     dispatch(setFavourites(state))
    // } catch (e) {
    //     console.log(e)
    // }
}

export function loadFromLocalStorage() {
    // try {
    //     const serializedState = localStorage.getItem("state");
    //     if (serializedState === null) return undefined
    //     return JSON.parse(serializedState);
    // } catch (e) {
    //     console.log(e)
    //     return undefined;
    // }
} 