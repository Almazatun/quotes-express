import React, {Component} from 'react'
import {IPost} from "../containers/PostBlogContainer/PostBlogContainer";
import style from './PostBlog.module.scss'
import {PAGES} from "../Navbar/Navbar";
import {NavLink} from 'react-router-dom';

interface PostProps {
    postTitle?: string
    post: IPost | undefined | null
}

export class PostBlog extends Component<PostProps, {}> {
    constructor(props: PostProps) {
        super(props);
    }

    render() {
        return (
            <div className={style.post_blog_container}>
                <div className={style.prev_location}>
                    <NavLink to={PAGES.POSTS}>
                        <button>
                            {" ⏪ Previous"}
                        </button>
                    </NavLink>
                </div>
                <div className={style.post_blog_content}>
                    <h3>Post Title</h3>
                    <div className={style.post_body}>
                        <p>{this.props.post?.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}