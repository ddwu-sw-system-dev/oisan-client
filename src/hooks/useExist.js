import { useState, useEffect } from "react";

const useAuth = () => {
    const [loginCustomer, setloginCustomer] = useState();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem("customer")) {
            setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
            setIsLogin(true);
        }
    }, []);

    return { 
        loginCustomer: loginCustomer,
        isLogin: isLogin,
    };
};

export default useAuth;