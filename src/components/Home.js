import React from 'react';
import Layout from "../containers/Layout";
import Typography from "@material-ui/core/Typography";
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getUser = () => Cookies.get('user');
export const isAuthenticated = () => !!getAccessToken();

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(getUser());
    }

    // componentDidMount() {
    //     axios.get(settings.base_url + '/api/v1/get-user/')
    //         .then(res => {
    //             console.log(res.data);
    //             // this.setState({token: res.data})
    //         })
    //         .catch(err => {
    //             console.log('error loading data', err);
    //         });
    // };

    render() {
        return (
            <div>
                <Layout props={this.props}>
                    <Typography variant="h3" gutterBottom>
                        Welcome, {JSON.parse(getUser()).first_name}!
                    </Typography>
                </Layout>
            </div>
        )
    }
}

export default Home;