import React, {ChangeEvent, Component, FormEvent} from 'react'
import style from './LogIn.module.scss'
import {RequestStatus} from "../../reducer";
import {Button} from "../shared/Button/Button";

interface LogInProps {
    userName: string
    password: string
    errors: Array<string>
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    submit: (event: FormEvent) => void
    loading: RequestStatus
}


export class LogIn extends Component<LogInProps, {}> {
    constructor(props: LogInProps) {
        super(props);
    }

    render() {
        const errorStyle = this.props.errors.length >= 1 ? style.errors : ''
        return (
            <div className={style.login_container}>
                <form className={style.login_form_container} onSubmit={this.props.submit}>
                    <div className={style.form_top}>
                        <span>{'Welcome to 🦉'}</span>
                    </div>
                    <div className={style.form_field}>
                        <span>User Name</span>
                        <label>
                            <input
                                value={this.props.userName}
                                type="text"
                                data-field={"userName"}
                                onChange={this.props.onChange}
                            />
                        </label>
                    </div>
                    <div className={style.form_field}>
                        <span>Password</span>
                        <label>
                            <input
                                type="password"
                                value={this.props.password}
                                data-field={"password"}
                                onChange={this.props.onChange}
                            />
                        </label>
                    </div>
                    <div className={style.form_bottom}>
                        <Button title={'Log In'}
                                status={this.props.loading}
                                disabled={this.props.loading === "loading"}
                        />
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
                </form>
            </div>
        )
    }
}