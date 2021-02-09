import React, {ChangeEvent, Component} from 'react'
import {WritePost} from "../../WritePost/WritePost";
import {newPostValidators} from "../../../utils/validators";
import {postsActions} from "../../Posts";
import {connect, ConnectedProps} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect/WithAuthRedirect";
import {Redirect} from "react-router-dom";
import {PAGES} from "../../Navbar/Navbar";

interface WritePostContainerState {
    postTitle: string
    postBody: string
    errors: Array<string>,
    redirect: boolean
}

export type ChangeEventType = ChangeEvent<HTMLInputElement & HTMLTextAreaElement>

export class WritePostContainer extends Component<TProps, WritePostContainerState> {
    constructor(props: TProps) {
        super(props);
        this.state = {
            postTitle: '',
            postBody: '',
            errors: [],
            redirect: false
        }

        this.onChangeWritePostContainer = this.onChangeWritePostContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChangeWritePostContainer(event: ChangeEventType) {
        event.persist();
        let value = event.currentTarget.value.trim() !== '' ? event.currentTarget.value : '';
        if (event.currentTarget.dataset.field) {
            const trigger: string = event.currentTarget.dataset.field;
            if (trigger === "postTitle") {
                if (value.length <= 20) {
                    this.setState({
                        ...this.state,
                        postTitle: value
                    })
                }
            } else if (trigger === "postBody") {
                this.setState({
                    ...this.state,
                    postBody: value
                })
            }
        }

    }

    handleSubmit() {
        const {valid, errors} = newPostValidators(this.state.postTitle, this.state.postBody)

        if (errors) {
            this.setState({
                ...this.state,
                errors: [...errors]
            })
        }
        if (this.state.errors) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    errors: []
                })
            }, 5000)
        }
        if (valid) {
            const {postTitle, postBody} = this.state
            this.props.createPostTC({postTitle, body: postBody})
            this.setState({
                ...this.state,
                postTitle: '',
                postBody: '',
                redirect: true
            })
            setTimeout(() => {
                this.setState({
                    ...this.state,
                  redirect: false
                })
            }, 2000)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={PAGES.POSTS} />
        }
        return <WritePost
            newPostTitle={this.state.postTitle}
            postBody={this.state.postBody}
            errors={this.state.errors}
            onChangeFields={this.onChangeWritePostContainer}
            handleSubmit={this.handleSubmit}
        />
    }
}

//Connect
const mapStateToProps = () => {
    return {};
};

const {createPostTC} = postsActions

const connector = connect(mapStateToProps, {createPostTC});

//Connect Type
type TProps = ConnectedProps<typeof connector>;

const WrappedWritePostContainer = WithAuthRedirect(WritePostContainer)

export default connector(WrappedWritePostContainer)