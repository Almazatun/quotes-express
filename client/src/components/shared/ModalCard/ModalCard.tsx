import React, {Component} from 'react'
import {Background} from '../Background/Background';
import style from './ModalCard.module.scss'

interface ModalCardProps {
    show: boolean
    closeModal: () => void
}

interface ModalCardState {
    showModalCard: boolean
}

export class ModalCard extends Component<ModalCardProps, ModalCardState> {

    constructor(props: ModalCardProps) {
        super(props);
        this.state = {
            showModalCard: false
        }
        //Events
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal() {
        this.props.closeModal()
        this.setState({
            showModalCard: false
        })
    }
    componentDidUpdate(prevProps: ModalCardProps) {
        if (this.props.show !== prevProps.show) {
            this.setState({
                showModalCard: !this.state.showModalCard
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Background show={this.state.showModalCard} clicked={this.closeModal}/>
                <div
                    className={style.modal_card}
                    style={{
                        transform: this.state.showModalCard ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.state.showModalCard ? 1 : 0
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}