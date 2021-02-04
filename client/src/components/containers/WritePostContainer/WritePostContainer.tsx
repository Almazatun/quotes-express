import React, {ChangeEvent, Component} from 'react'
import {WritePost} from "../../WritePost/WritePost";
import {newPostValidators} from "../../../utils/validators";
import {postsActions} from "../../Posts";
import {connect, ConnectedProps} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect/WithAuthRedirect";

interface WritePostContainerState {
    postTitle: string
    postBody: string
    errors: Array<string>
}

export type ChangeEventType = ChangeEvent<HTMLInputElement & HTMLTextAreaElement>

export class WritePostContainer extends Component<TProps, WritePostContainerState> {
    constructor(props: TProps) {
        super(props);
        this.state = {
            postTitle: '',
            postBody: '',
            errors: []
        }

        this.onChangeWritePostContainer = this.onChangeWritePostContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChangeWritePostContainer(event: ChangeEventType) {
        event.persist();
        let value = event.currentTarget.value;
        if (event.currentTarget.dataset.field) {
            const trigger: string = event.currentTarget.dataset.field;
            if (trigger === "postTitle") {
                this.setState({
                    ...this.state,
                    postTitle: value
                })
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
            //this.props.createPostTC()
            this.setState({
                ...this.state,
                postTitle: '',
                postBody: ''
            })
        }
    }

    render() {
        console.log(this.state)
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