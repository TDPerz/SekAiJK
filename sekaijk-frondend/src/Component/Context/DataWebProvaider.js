import { createContext } from "react"
import { Cookies, useCookies } from 'react-cookie'

export const DataWebContext = createContext()

export function DataWebProvider(props) {
    const [cookies, setCookie, removeCookie] = useCookies()

    const getToken = () => {
        if (cookies["token"]) {
            return cookies["token"]
        }
        else if (window.sessionStorage.getItem('token')) {
            return window.sessionStorage.getItem('token');
        }
        else {
            return null
        }
    }

    const setToken = (permanent, token) => {
        if(permanent){
            setCookie("token", token)
        }
        else{
            window.sessionStorage.setItem("token", token)
        }
    }

    const deleteToken = () => {
        if(cookies["token"]){
            removeCookie("token")
        }
        else if(window.sessionStorage.getItem('token ')){
            window.sessionStorage.removeItem("token")
        }
        else{
            return null
        }
    }

    return (
        <DataWebContext.Provider value={{ getToken, setToken, deleteToken }}>
            {props.children}
        </DataWebContext.Provider>
    )
}