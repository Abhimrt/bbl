import react, { createContext, useState } from 'react';
const host = "http://localhost:5000/api/"
export const usercontext = createContext()
const UserState = (props) => {
    return (
        <usercontext.Provider value={{ user, book, fetch, login, create, findBook, createBook, editBook }}>
            {props.children}
        </usercontext.Provider>

    )
}
export default UserState;