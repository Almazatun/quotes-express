import React, {Component, Fragment} from 'react'
import {Card} from '../shared/Card/Card';
import {Post} from './reducer';

interface PostsProps {
    posts: Array<Post>
}

export class Posts extends Component<PostsProps, {}> {
    constructor(props: PostsProps) {
        super(props);

    }

    render() {
        const postsTSX = this.props.posts.map(post => {
            return (
                <Fragment key={post._id}>
                    <Card postId={post._id}
                          userName={post.userName}
                          body={post.body}
                          createAt={post.createdAt}
                          postTitle={post.postTitle}
                    />
                </Fragment>
            )
        })
        return (
            <Fragment>
                {postsTSX}
            </Fragment>
        )
    }
}
