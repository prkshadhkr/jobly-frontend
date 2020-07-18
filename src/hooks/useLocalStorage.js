import { useState, useEffect } from 'react';

const useLocalStorage = (k, v = null) =>{
    const initialValue = localStorage.getItem(k) || v;
    const [data, setData] = useState(initialValue);

    useEffect(() =>{
      if(!data){
          localStorage.removeItem(k);
      } else {
          localStorage.setItem(k, data);
      };
    }, [k, data]);

    return[data, setData];
}

export default useLocalStorage;