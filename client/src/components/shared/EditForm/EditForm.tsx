import React, {Component} from 'react'
import style from './EditForm.module.scss'
import {ChangeEventType} from "../../containers/WritePostContainer/WritePostContainer";
import {WritePost} from "../../WritePost/WritePost";

interface EditFormProps {
    cancelHandler: () => void
    onChangeHandler: any
    title: string,
    postBody: string,
    submit: () => void,
}

export class EditForm extends Component<EditFormProps, {}> {
    constructor(props: EditFormProps) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(event: ChangeEventType) {
        this.props.onChangeHandler(event)
    }

    render() {
        return (
            <div className={style.box}>
                <div className={style.box_top}>
                    <button onClick={this.props.cancelHandler}>
                        {'❌'}
                    </button>
                </div>
                <WritePost
                    onChangeFields={this.onChange}
                    newPostTitle={this.props.title}
                    postBody={this.props.postBody}
                    handleSubmit={this.props.submit}
                    errors={[]}
                />
            </div>
        );
    }
}