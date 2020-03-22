import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    public render(): React.ReactElement {
        return (
            <div>
                <NavMenu />
                <Container>{this.props.children}</Container>
            </div>
        );
    }
}
