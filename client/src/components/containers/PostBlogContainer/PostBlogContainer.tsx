import React, {Component, ComponentClass, Fragment} from "react";
import {AppRootStateType} from "../../../reducer";
import {Post, PostsState} from "../../Posts/reducer";
import {selectPosts} from "../PostsContainer/Selectors";
import {postsActions} from "../../Posts";
import {connect, ConnectedProps} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect/WithAuthRedirect";
import { PostBlog } from "../../PostBlog/PostBlog";
import { withRouter } from "react-router-dom";
import {RouteComponentProps} from "react-router";

interface PostBlogContainerProps {
    post: IPost | undefined | null
}

export class PostBlogContainer extends Component<MergedT, PostBlogContainerProps> {

    constructor(props: MergedT) {
        super(props);

        this.state = {
            post: null
        }

        this.findPost = this.findPost.bind(this)
    }

    componentDidMount() {
        //Because not possible use hook useParams have used withRouter HOC in classComponent =>
        // => to get params data from URL
        const postId = this.props.match.params.postId

        //This is action need it because if refresh web page should make request to get posts from server again
        this.props.fetchPostsTC()
        this.findPost(postId)
    }

    componentDidUpdate(prevProps: Readonly<MergedT>, prevState: Readonly<PostBlogContainerProps>, snapshot?: any) {
        if (this.props.posts !== prevProps.posts) {
            const postId = this.props.match.params.postId
            this.findPost(postId)
        }
    }


    findPost(postId: string) {
        const findPost = this.props.posts.find((post) => {
            return postId === post._id
        })
        this.setState({
            ...this.state,
            post: findPost
        })

    }

    render() {
        return (
            <Fragment>
                <PostBlog post={this.state.post}/>
            </Fragment>
        )
    }
}

//Type
type PostPick = Pick<PostsState, "posts">;

export interface IPost extends Post {}

interface Route {
    postId: string
}

//Connect
const mapStateToProps = (state: AppRootStateType): PostPick => {
    return {
        posts: selectPosts(state),
    }
}

const {deletePostTC, fetchPostsTC} = postsActions

const connector = connect(mapStateToProps, {deletePostTC, fetchPostsTC});

//Connect Type
type TProps = ConnectedProps<typeof connector>;

type MergedT = TProps & RouteComponentProps<Route>

//Wrapped by withRouter HOC
const WithRouterPostBlogContainer = withRouter<RouteComponentProps, ComponentClass | any>(PostBlogContainer)

//Wrapped by WithAuthRedirect HOC
const WrappedPostBlogContainer = WithAuthRedirect(WithRouterPostBlogContainer)

export default connector(WrappedPostBlogContainer);