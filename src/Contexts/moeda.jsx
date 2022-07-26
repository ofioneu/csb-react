import  { useState, useEffect, createContext } from "react";
import axios from 'axios';

export const MoedaContext = createContext({})

function MoedaProvaider({ children }) {
    const [moeda, setMoeda] = useState([])

    async function loadMoeda() {
        const api = axios.create({
            baseURL: ' https://economia.awesomeapi.com.br'
        });
        const response = await api.get('last/USD-BRL')
        setMoeda(response.data.USDBRL);
    }

    useEffect(() => {
        setInterval(() => {
            return loadMoeda()
        }, 10000)
    }, [])


    return (
        <MoedaContext.Provider value={{ moeda }}>
            {children}
        </MoedaContext.Provider>
    )

}

export default MoedaProvaider


