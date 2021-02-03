import React from 'react'
import style from './Content.module.scss'
import {Route, Switch} from "react-router-dom";
import {PAGES} from "../../Navbar/Navbar";
import LogInContainer from "../../containers/LogInContainer/LogInContainer";
import PostsContainer from "../../containers/PostsContainer/PostsContainer";
import {WithAuthRedirect} from "../../withAuthRedirect/withAuthRedirect";

export class Content extends React.Component {
    render() {
        return (
            <div className={style.content}>
                <Switch>
                    <Route exact path={PAGES.POSTS} component={() =><WithAuthRedirect> <PostsContainer/> </WithAuthRedirect> }/>
                    <Route exact path={PAGES.LOG_IN} component={() => <LogInContainer/>}/>
                </Switch>
            </div>
        )
    }
}