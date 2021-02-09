import React, {Component, ComponentClass, Fragment} from "react";
import {AppRootStateType} from "../../../reducer";
import {Post, PostsState} from "../../Posts/reducer";
import {selectPosts} from "../PostsContainer/Selectors";
import {postsActions} from "../../Posts";
import {connect, ConnectedProps} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect/WithAuthRedirect";
import {PostBlog} from "../../PostBlog/PostBlog";
import {Redirect, withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {PAGES} from "../../Navbar/Navbar";
import {ModalCard} from "../../shared/ModalCard/ModalCard";
import {EditForm} from "../../shared/EditForm/EditForm";
import {ChangeEventType} from "../WritePostContainer/WritePostContainer";
import {newPostValidators} from "../../../utils/validators";
import {NewPostBody} from "../../../api/api";

interface PostBlogContainerProps {
    post: IPost | undefined | null
    redirect: boolean,
    editPost: {
        postTitle: string
        postBody: string
    },
    errors: Array<string>
    showEditPostModal: boolean
}

export class PostBlogContainer extends Component<MergedT, PostBlogContainerProps> {

    constructor(props: MergedT) {
        super(props);

        this.state = {
            post: null,
            redirect: false,
            editPost: {
                postTitle: '',
                postBody: ''
            },
            errors: [],
            showEditPostModal: false
        }

        this.findPost = this.findPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.onChangePostEditForm = this.onChangePostEditForm.bind(this)
        this.modalShowPostModalHandler = this.modalShowPostModalHandler.bind(this)
        this.editPost = this.editPost.bind(this)
    }

    componentDidMount() {
        //Because not possible use hook useParams have used withRouter HOC in classComponent =>
        // => to get params data from URL
        const postId = this.props.match.params.postId

        //This is action need it because if refresh web page should make request to get posts from server again
        this.props.fetchPostsTC()
        this.findPost(postId)
    }

    componentDidUpdate(prevProps: Readonly<MergedT>) {
        if (prevProps.posts !== this.props.posts) {
            const postId = this.props.match.params.postId
            this.findPost(postId)
        }
    }


    findPost(postId: string) {
        const findPost = this.props.posts.find((post) => {
            return postId === post._id
        })
        this.setState({
            post: findPost
        })
    }

    deletePost() {
        // eslint-disable-next-line no-restricted-globals
        let sure = confirm("Do you really want to delete the post?")
        if (sure) {
            this.props.deletePostTC({postId: this.state.post!._id})
            this.setState({
                redirect: true
            })
        }
    }

    onChangePostEditForm (event: ChangeEventType) {
        event.persist();
        let value = event.currentTarget.value.trim() !== '' ? event.currentTarget.value : '';
        if (event.currentTarget.dataset.field) {
            const trigger: string = event.currentTarget.dataset.field;
            if (trigger === "postTitle") {
                if (value.length <= 20) {
                    this.setState({
                        editPost: {
                            ...this.state.editPost,
                            postTitle: value
                        }
                    })
                }
            } else if (trigger === "postBody") {
                this.setState({
                    editPost: {
                        ...this.state.editPost,
                        postBody: value
                    }
                })
            }
        }
    }

    editPost() {
        const {valid, errors} = newPostValidators(this.state.editPost.postTitle, this.state.editPost.postBody)

        if (errors) {
            this.setState({
                errors: [...errors]
            })
        }
        if (this.state.errors) {
            setTimeout(() => {
                this.setState({
                    errors: []
                })
            }, 1000)
        }
        if (valid) {
            const {postTitle, postBody} = this.state.editPost
            const updatePostBody: NewPostBody = {postTitle, body: postBody}
            this.props.updatePostTC({postId: this.state.post!._id, updatePostBody})
            this.setState({
                editPost: {
                    ...this.state.editPost,
                    postTitle: '',
                    postBody: '',
                },
            })
            this.setState({
                showEditPostModal: false
            })
        }
    }

    modalShowPostModalHandler () {
        this.setState({
            ...this.state,
            showEditPostModal: !this.state.showEditPostModal,
            editPost: {
                postTitle: this.state.post!.postTitle,
                postBody: this.state.post!.body
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={PAGES.POSTS}/>
        }
        return (
            <Fragment>
                <PostBlog post={this.state.post}
                          deletePost={this.deletePost}
                          showModal={this.modalShowPostModalHandler}
                />
                <ModalCard show={this.state.showEditPostModal}
                           closeModal={this.modalShowPostModalHandler}
                >
                    <EditForm title={this.state.editPost.postTitle}
                              postBody={this.state.editPost.postBody}
                              cancelHandler={this.modalShowPostModalHandler}
                              onChangeHandler={this.onChangePostEditForm}
                              submit={this.editPost}
                    />
                </ModalCard>
            </Fragment>
        )
    }
}

//Type
type PostPick = Pick<PostsState, "posts">;

export interface IPost extends Post {
}

interface Route {
    postId: string
}

//Connect
const mapStateToProps = (state: AppRootStateType): PostPick => {
    return {
        posts: selectPosts(state),
    }
}

const {deletePostTC, fetchPostsTC, updatePostTC} = postsActions

const connector = connect(mapStateToProps, {deletePostTC, fetchPostsTC, updatePostTC});

//Connect Type
type TProps = ConnectedProps<typeof connector>;

type MergedT = TProps & RouteComponentProps<Route>

//Wrapped by withRouter HOC
const WithRouterPostBlogContainer = withRouter<RouteComponentProps, ComponentClass | any>(PostBlogContainer)

//Wrapped by WithAuthRedirect HOC
const WrappedPostBlogContainer = WithAuthRedirect(WithRouterPostBlogContainer)

export default connector(WrappedPostBlogContainer);