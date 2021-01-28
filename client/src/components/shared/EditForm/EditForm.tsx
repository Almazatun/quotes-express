import React, {ChangeEvent, Component} from 'react'
import style from './EditForm.module.scss'

interface EditFormProps {
    cancelHandler: any
    editContent: any
    title: string
}

export class EditForm extends Component<EditFormProps, {}> {
    constructor(props: EditFormProps) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this)
    }

    onChangeTitle(event: ChangeEvent<HTMLTextAreaElement>) {
        this.props.editContent(event.currentTarget.value)
    }

    render() {
        return (
            <div className={style.box}>
                <div className={style.box_top}>
                    <button onClick={this.props.cancelHandler}>
                        Cancel
                    </button>
                </div>
                <textarea
                    value={this.props.title}
                    onChange={this.onChangeTitle}
                />
                <div className={style.boxBtn}>
                    <button onClick={this.props.editContent}>Edit</button>
                </div>
            </div>
        );
    }
}