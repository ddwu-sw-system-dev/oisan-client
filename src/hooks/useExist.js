import { useState, useEffect } from "react";

const useExist = () => {
    const [loginCustomer, setloginCustomer] = useState();

    useEffect(() => {
        if(sessionStorage.getItem("customer") !== null){
            setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
        }
    }, []);

    return {
        loginCustomer: loginCustomer,
    };
};

export default useExist;