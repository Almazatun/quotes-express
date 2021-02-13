import React, {ChangeEvent, Component, FormEvent} from 'react'
import {LogIn} from "../../LogIn/LogIn";
import {AuthContext} from "../../../context/AuthContext";
import {validators} from "../../../utils/validators";
import {connect, ConnectedProps} from "react-redux";
import {authActions} from "../../../context";
import {AppRootStateType} from "../../../reducer";
import {selectIsAuth, selectUser} from "./Selectors";
import {AuthState} from "../../../context/reducer";
import {PAGES} from "../../Navbar/Navbar";
import {Redirect} from 'react-router-dom';
import {ApplicationState} from "../../../features/Application/reducer";
import {selectAppError, selectAppStatus} from "../ContentContainer/Selectors";

interface LogInContainerState {
    userName: string,
    password: string,
    errors: Array<string>,
    redirect: boolean
}

class LogInContainer extends Component<TProps, LogInContainerState> {

    static contextType = AuthContext

    constructor(props: TProps) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            errors: [],
            redirect: false
        }
        this.onChangeLoginContainerState = this.onChangeLoginContainerState.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChangeLoginContainerState(event: ChangeEvent<HTMLInputElement>) {
        event.persist();
        let value = event.currentTarget.value.trim() !== '' ? event.currentTarget.value : '';
        if (event.currentTarget.dataset.field) {
            const trigger: string = event.currentTarget.dataset.field;
            if (trigger === "userName") {
                this.setState({
                    ...this.state,
                    userName: value
                })
            } else if (trigger === "password") {
                this.setState({
                    ...this.state,
                    password: value
                })
            }
        }
    }

    submit(event: FormEvent) {
        if (event) event.preventDefault()

        const {errors, valid} = validators(this.state.userName, this.state.password)

        if (errors) {
            this.setState({
                ...this.state,
                errors: [...errors]
            })
        }
        if (this.state.errors) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    errors: []
                })
            }, 5000)
        }
        if (valid) {
            this.props.signInTC({
                userName: this.state.userName,
                password: this.state.password
            })
            this.setState({
                ...this.state,
                userName: '',
                password: ''
            })
        }
    }
    componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<LogInContainerState>, snapshot?: any) {
        if (this.props.isAuth !== prevProps.isAuth) {
          this.setState({
              redirect: true
          })
            setTimeout(() => {
                this.setState({
                    redirect: false
                })
            }, 2000)
        }
    }


    render() {
        if (this.props.isAuth) return <Redirect to={PAGES.POSTS}/>
        return this.state.redirect ? <Redirect to={PAGES.POSTS}/> : <LogIn
            userName={this.state.userName}
            password={this.state.password}
            errors={this.state.errors}
            onChange={this.onChangeLoginContainerState}
            submit={this.submit}
            loading={this.props.status}
        />
    }
}

//Connect
const mapStateToProps = (state: AppRootStateType): AuthState & ApplicationState => {
    return {
        user: selectUser(state),
        isAuth: selectIsAuth(state),
        status: selectAppStatus(state),
        errors: selectAppError(state),
    };
};

const {signInTC} = authActions

const connector = connect(mapStateToProps, {signInTC});

type TProps = ConnectedProps<typeof connector>;

export default connector(LogInContainer);