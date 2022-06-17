import { useState, useEffect } from "react";

const useExist = () => {
    const [loginCustomer, setloginCustomer] = useState();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
        setIsLogin(true);
    }, []);

    return {
        loginCustomer: loginCustomer,
        isLogin: isLogin,
    };
};

export default useExist;