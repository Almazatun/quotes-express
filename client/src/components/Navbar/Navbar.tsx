import React, {Component, Fragment} from "react"
import {NavLink} from "react-router-dom";
import style from './Navbar.module.scss'

export enum PAGES {
    POSTS = '/',
    POST = '/post',
    LOG_IN = '/logIn',
    WRITE_NEW_POST = '/writeNewPost'
}

interface NavbarProps {
    sighOut: () => void
    isAuth: boolean
}


export class Navbar extends Component<NavbarProps, {}> {
    constructor(props: NavbarProps) {
        super(props);
    }

    render() {
        return (
            <div className={style.navbar}>
                <div className={style.left_logo}>
                    <NavLink to={PAGES.POSTS}>{'🦉'}</NavLink>
                </div>
                {this.props.isAuth ? (
                    <Fragment>
                        <div className={style.right_post}>
                            <NavLink to={PAGES.WRITE_NEW_POST}> Write a post</NavLink>
                        </div>
                        <div className={style.right_user_profile}>
                            <span> {"👨‍🚀"}</span>
                        </div>
                        <div onClick={this.props.sighOut} className={style.right_user_logIn}>
                            <span>Log out</span>
                        </div>
                    </Fragment>
                ) : (
                    <div className={style.right_user_logIn}>
                        <NavLink to={PAGES.LOG_IN}>Log in</NavLink>
                    </div>
                )}
            </div>
        )
    }
}