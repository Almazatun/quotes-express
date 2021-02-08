import React, {Component, Fragment} from 'react'
import style from './ErrorSnackbar.module.scss'
import {ErrorType} from "../../../features/Application/reducer";

interface ErrorSnackbarProps {
    errors: ErrorType
}


export class ErrorSnackbar extends Component<ErrorSnackbarProps, {}> {
    constructor(props: ErrorSnackbarProps) {
        super(props);
    }

    render() {
        const errors = this.props.errors !== '' ? (
            <div className={style.error}>
                <ul>
                    {Object.entries(this.props.errors).map(([key, value]) => {
                        return (
                            <li key={key}>{value}</li>
                        )
                    })}
                </ul>
            </div>
        ) : ''
        return (
            <Fragment>
                {errors}
            </Fragment>
        )
    }
}