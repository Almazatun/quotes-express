import React, {Component} from 'react'
import style from './WritePost.module.scss'

export class WritePost extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className={style.write_post_container}>
                <span>Lets write post</span>
            </div>
        )
    }
}