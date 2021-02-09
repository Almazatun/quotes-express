import React, {Component, Fragment} from 'react'
import style from './WritePost.module.scss'
import {ChangeEventType} from "../containers/WritePostContainer/WritePostContainer";


interface WritePostProps {
    onChangeFields: (event: ChangeEventType) => void
    newPostTitle: string
    postBody: string
    handleSubmit: () => void
    errors: Array<string>
}

export class WritePost extends Component<WritePostProps, {}> {
    constructor(props: WritePostProps) {
        super(props);
    }

    render() {
        const {postBody, handleSubmit, newPostTitle, onChangeFields} = this.props
        const errorStyle = this.props.errors.length >= 1 ? style.errors : ''
        return (
            <Fragment>
                <div className={style.write_post_container}>
                    <div className={style.post_box}>
                        <div className={style.new_post_title}>
                            <input type="text"
                                   value={newPostTitle}
                                   data-field={"postTitle"}
                                   placeholder={'👉 Post title'}
                                   onChange={onChangeFields}
                            />
                        </div>
                        <div className={style.new_post_body}>
                    <textarea name="postBody"
                              value={postBody}
                              data-field={"postBody"}
                              onChange={onChangeFields}
                    />
                        </div>
                    </div>
                    <div className={style.btns}>
                        <button onClick={handleSubmit}>
                            Publish
                        </button>
                    </div>
                </div>
                {this.props.errors && (
                    <div className={errorStyle}>
                        {this.props.errors.map((error, index) => {
                            return (
                                <span key={index}>
                                        {error}
                                    </span>
                            )
                        })}
                    </div>
                )}
            </Fragment>
        )
    }
}