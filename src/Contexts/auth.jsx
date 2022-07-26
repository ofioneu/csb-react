import { useState, createContext, useEffect } from "react";
import firebase from '../Services/firebaseConnection';

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('sistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage()

    }, [])

    async function singIn(email, pass){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(async(value)=>{
            let uid = value.user.uid;
            
            let data = {
                uid: uid,
                email: value.user.email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)

        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
        })

    }
    

    async function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    async function singOut(){
        await firebase.auth().singOut();
        localStorage.removeItem('SistemaUser')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, singIn, singOut, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider