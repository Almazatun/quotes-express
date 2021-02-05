import React, {Component, Fragment} from 'react'
import {AppRootStateType} from "../../../reducer";
import {selectPosts, selectPostsError} from "./Selectors";
import {connect, ConnectedProps} from 'react-redux';
import {Posts} from '../../Posts/Posts';
import {PostsState} from '../../Posts/reducer';
import {postsActions} from "../../Posts";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect/WithAuthRedirect";

class PostsContainer extends Component<TProps, {}> {
    constructor(props: TProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPostsTC()
    }

    render() {
        return (
            <Fragment>
                <Posts posts={this.props.posts}/>
            </Fragment>
        );
    }
}

//Connect
const mapStateToProps = (state: AppRootStateType): PostsState => {
    return {
        posts: selectPosts(state),
        errors: selectPostsError(state),
    };
};

const {fetchPostsTC} = postsActions

const connector = connect(mapStateToProps, {fetchPostsTC});

//Connect Type
type TProps = ConnectedProps<typeof connector>;

const WrappedPostsContainer =  WithAuthRedirect(PostsContainer)

export default connector(WrappedPostsContainer);
