import React from 'react';
import history from "./history";
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getUser = () => Cookies.get('user');
export const isAuthenticated = () => !!getAccessToken();

class Logout extends React.Component {
    constructor(props) {
        super(props);
        Cookies.remove('access_token');
        Cookies.remove('user');
        history.push('/login');
    }

    render() {
        return (
            <div/>
        )
    }
}

export default Logout;