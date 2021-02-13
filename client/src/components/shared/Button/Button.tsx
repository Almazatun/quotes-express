import React, {ButtonHTMLAttributes, DetailedHTMLProps, Fragment} from 'react'
import style from './Button.module.scss'
import {RequestStatus} from "../../../reducer";
import loader from '../../../assets/loading.svg'

interface ButtonProps extends BTN {
    title: string
    status: RequestStatus
}

type BTN = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = React.memo<ButtonProps> ( (props) => {
    const {title, status} = props
    return (
        <button className={style.btn} {...props}>
            {status !== "loading" ?
                <span>{title}</span> :
                <Fragment>
                    <img height={20} width={20} src={loader} alt="/"/>
                </Fragment>
            }
        </button>
    )
})