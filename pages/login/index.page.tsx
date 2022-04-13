import { FirstLoginComponent } from './components/first-time';
import { LoginComponent } from './components/login';
import { useState } from 'react';

export const LoginPage = () => {
    const [firstLogin, setLogin] = useState(false);

    const changeValueLogin = (value: boolean) => {
        setLogin(value);
    }

    return (
        <>
            {!firstLogin ? <LoginComponent changeLogin={changeValueLogin}></LoginComponent> : <FirstLoginComponent></FirstLoginComponent>}
        </>
    )
}

export default LoginPage;