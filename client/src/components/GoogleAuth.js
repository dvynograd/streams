import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1052672086359-ffp90seq8mf745f95l7mu2ffomq16o3r.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
               this.auth = window.gapi.auth2.getAuthInstance();
               this.onAuthChange(this.auth.isSignedIn.get());
               this.auth.isSignedIn.listen(this.onAuthChange);
            });
        })
    }

    onAuthChange = isSignIn => {
        if (isSignIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSingInClick = () => {
        this.auth.signIn();
    };

    onSingOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) {
            return (
                <button onClick={this.onSingOutClick} className="ui red google button"><i className="google icon">Sign Out</i></button>
            );
        } else {
            return (
                <button onClick={this.onSingInClick} className="ui red google button"><i className="google icon">Sign In with Google</i></button>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);