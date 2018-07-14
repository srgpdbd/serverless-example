import React from 'react';
import config from "../../config";
import Amplify from 'aws-amplify';
import axios from 'axios';
import {Auth} from 'aws-amplify';
import { Input } from 'antd';

/**
 * Login form
 */

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
      ]
    }
  });

export default class LOLLoginForm extends React.Component {

    handleSubmit = async event => {
        event.preventDefault();
      
        try {
          await Auth.signIn(event.target.login.value, event.target.password.value);
          this.sendGet('CAPNJAZZ');
        } catch (e) {
          alert(e.message);
        }
      }

    sendGet(getParam) {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        let url = `https://3hvvd4jpzf.execute-api.us-east-1.amazonaws.com/dev/ping/${getParam}/detail`;
        console.log("URL", url);
        axios.get(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("ERROR");
                console.log(error);
            })
    }
      

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input placeholder="login" name="login" />
                    <Input type="password" name="password" placeholder="password"/>
                    <Input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}