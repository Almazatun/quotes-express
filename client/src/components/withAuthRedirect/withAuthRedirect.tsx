import React, {Component, Fragment} from 'react'
import {PAGES} from "../Navbar/Navbar";
import {Redirect} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

interface WithAuthRedirectProps {
    children: React.ReactNode
}

export class WithAuthRedirect extends Component<WithAuthRedirectProps, {}> {

    static contextType = AuthContext

    render() {
        return (
            <Fragment>
                {!this.context.isAuth ? <Redirect to={PAGES.LOG_IN}/> : this.props.children}
            </Fragment>
        )
    }
}
