import { onAuthStateChanged } from '@firebase/auth';
import axios from 'axios';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState,createContext ,useEffect,useContext } from 'react'
import { CoinList } from './Config/Api';
import { auth, db } from './firebase';
const Crypto=createContext();

const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("Rs.");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert,setAlert]=useState({
        open:false,
        message:"",
        type:"success",
    })
    const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      console.log(user);
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

    useEffect(() => {
       onAuthStateChanged(auth,user=>{
           if(user)
            setUser(user);
           else
            setUser(null); 
       })
    }, [])
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
    
        setCoins(data);
        setLoading(false);
      };
  
    useEffect(() => {
        if(currency==="INR")
            setSymbol("₹");
        else if(currency==="USD")
            setSymbol("$");   
    }, [currency]);
    return (
        <Crypto.Provider value={{currency,symbol,setCurrency,coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
            {children}
        </Crypto.Provider>
    )
}
export default CryptoContext;
export const CryptoState=()=>{
    return useContext(Crypto);
}
