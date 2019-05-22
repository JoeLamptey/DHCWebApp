import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class AuthRequired extends Component {

  constructor(props) {
    super(props);

    const { cookies } = props;
    if(typeof props.redirectTo !== 'undefined') {
      cookies.set('authRedirectTo', props.redirectTo, { path: '/', expires: new Date(Date.now()+10000)}); 
    }
  }


  render() {

    if(typeof this.state.validAuthToken === "undefined") {
      return(<Redirect to='/auth' /> );
		
    } else {
      return (this.props.orRender);
    }
  }
}

export default AuthRequired;