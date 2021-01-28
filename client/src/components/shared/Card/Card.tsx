import React from 'react'
import {RequestStatus} from "../../../reducer";
import style from './Card.module.scss'

interface CardProps {
    content: string,
    author: string,
    requestStatus: RequestStatus
    openModal: () => void
}

const initialState = {show: true}
type CardState = Readonly<typeof initialState>

export class Card extends React.Component<CardProps, CardState> {
    readonly state: CardState = initialState

    constructor(props: CardProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.props.openModal()
    }

    render() {
        const urlLogo = 'https://iconarchive.com/download/i75525/cornmanthe3rd/squareplex/Utilities-notepad.ico'
        const cardContent = this.state.show ? (
            <div className={style.card_content_front}>
                <img src={`${urlLogo}`} alt="/"/>
            </div>
        ) : (
            <div className={style.card_content_back}>
                <span>{this.props.content}</span>
            </div>
        ) ;
        const titleCardBottomBtn = this.state.show ? `Look at ${this.props.author} Quote` : 'Back'

        return (
            <div className={style.card_box}>
                <div className={style.card_top}>
                    <span onClick={this.props.openModal}>
                        <img src="https://image.flaticon.com/icons/png/128/64/64576.png" alt="/"/>
                    </span>
                </div>
                {cardContent}
                <div className={style.card_bottom_btns}>
                    <button className={style.btn} onClick={this.toggleComponent}>{`${titleCardBottomBtn}`}</button>
                </div>
            </div>
        )
    }

    private toggleComponent = () => this.setState(toggleClick)
}

const toggleClick = (prevState: CardState) => {
    return {
        ...prevState,
        show: !prevState.show
    }
}