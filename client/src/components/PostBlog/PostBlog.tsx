import React, {Component} from 'react'
import {IPost} from "../containers/PostBlogContainer/PostBlogContainer";
import style from './PostBlog.module.scss'
import {PAGES} from "../Navbar/Navbar";
import {NavLink} from 'react-router-dom';

interface PostProps {
    postTitle?: string
    post: IPost | undefined | null,
    deletePost: () => void
    showModal: () => void
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
                                Previous
                            </button>
                        </NavLink>
                    </div>
                    <div className={style.post_blog_content}>
                        <div className={style.post_blog_update_btns}>
                            <button className={style.edit_btn}
                                    onClick={this.props.showModal}
                            >
                                Edit post
                            </button>
                            <button className={style.delete_btn}
                                    onClick={this.props.deletePost}
                            >
                                Delete post
                            </button>
                        </div>
                        <h3>{this.props.post?.postTitle}</h3>
                        <div className={style.post_body}>
                            <p>{this.props.post?.body}</p>
                        </div>
                    </div>
                </div>
        );
    }
}