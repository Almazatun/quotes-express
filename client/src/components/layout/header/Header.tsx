import React, {Component} from 'react'
import NavbarContainer from '../../containers/NavbarContainer/NavbarContainer'
import style from './Header.module.scss'

export class Header extends Component {
    render() {
        return (
            <div className={style.header}>
                <NavbarContainer/>
            </div>
        )
    }
}