import * as React from 'react';
import { Component } from 'react';
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { DisplayWhen } from './DisplayWhen';

interface INavMenuState {
    collapsed: boolean;
    loggedIn: boolean;
}

export class NavMenu extends Component<{}, INavMenuState> {
    static displayName = NavMenu.name;

    constructor(props: any) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: true,
        };
    }

    public toggleNavbar(): void {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    public render(): React.ReactElement {
        return (
            <header>
                <Navbar
                    className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    light
                >
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            Digitaler Gesundheitsassistent
                        </NavbarBrand>
                        <NavbarToggler
                            onClick={this.toggleNavbar}
                            className="mr-2"
                        />
                        <Collapse
                            className="d-sm-inline-flex flex-sm-row-reverse"
                            isOpen={!this.state.collapsed}
                            navbar
                        >
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/"
                                    >
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/counter"
                                    >
                                        Counter
                                    </NavLink>
                                </NavItem>
                                <DisplayWhen visible={this.state.loggedIn}>
                                    <NavItem>
                                        <NavLink
                                            tag={Link}
                                            className="text-dark"
                                            to="/fetch-data"
                                        >
                                            Fetch data
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag={Link}
                                            className="text-dark"
                                            to="/fetch-users"
                                        >
                                            Fetch Users
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag={Link}
                                            className="text-dark"
                                            to="/diary-form"
                                        >
                                            Tagebuch
                                        </NavLink>
                                    </NavItem>
                                </DisplayWhen>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
