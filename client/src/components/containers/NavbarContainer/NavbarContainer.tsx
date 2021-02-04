import React, {Component} from "react"
import {Navbar} from "../../Navbar/Navbar";
import {AuthContext} from "../../../context/AuthContext";
import {AppRootStateType} from "../../../reducer";
import {AuthState} from "../../../context/reducer";
import {selectIsAuth, selectUser} from "../LogInContainer/Selectors";
import {authActions} from "../../../context";
import {connect, ConnectedProps} from "react-redux";

class NavbarContainer extends Component<TProps, {}> {

    static contextType = AuthContext

    constructor(props: TProps) {
        super(props)

        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        this.props.signOut({
            _id: '',
            email: '',
            userName: '',
            token: ''
        })
        this.context.signOut()
    }

    render() {
        return <Navbar
            isAuth={this.props.isAuth}
            sighOut={this.signOut}
        />
    }
}

//Connect
const mapStateToProps = (state: AppRootStateType): AuthState => {
    return {
        user: selectUser(state),
        isAuth: selectIsAuth(state),
    };
};

const {signOut} = authActions

const connector = connect(mapStateToProps, {signOut});

type TProps = ConnectedProps<typeof connector>;

export default connector(NavbarContainer);