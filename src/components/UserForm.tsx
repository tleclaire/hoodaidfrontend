import React, { Component } from 'react';
import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    FormFeedback,
} from 'reactstrap';
import './Form.css';
import { IUser, DefaultUser } from './FetchUsers';
import { http } from '../Libs/http';
import { post } from '../Libs/http';

interface IEmailState {
    emailState: string;
}

interface IFormState {
    email: string;
    password: string;
    vorname: string;
    nachname: string;
    plz: string;
    ort: string;
    strasse: string;
    validate: IEmailState;
    [key: string]: any;
}

class UserForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            vorname: '',
            nachname: '',
            plz: '',
            ort: '',
            strasse: '',
            validate: {
                emailState: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }

    private validateEmail(event: React.FormEvent<HTMLInputElement>): void {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        const element = event.target as HTMLInputElement;
        if (emailRex.test(element.value)) {
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
        }
        this.setState({ validate });
    }

    handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    };

    private formatUser(state: IFormState): IUser {
        return {
            vorname: state.vorname,
            nachname: state.nachname,
            ort: state.ort,
            plz: state.plz,
            strasse: state.strasse,
            email: state.email,
        };
    }

    async submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let user: IUser = this.formatUser(this.state);
        await post('http://localhost:5000/api/Users', user);
        console.log(`Email: ${this.state.email}`);
    }

    render() {
        const {
            email,
            password,
            vorname,
            nachname,
            plz,
            ort,
            strasse,
        } = this.state;
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={e => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                value={email}
                                valid={
                                    this.state.validate.emailState ===
                                    'has-success'
                                }
                                invalid={
                                    this.state.validate.emailState ===
                                    'has-danger'
                                }
                                onChange={e => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your
                                email. Please input a correct email.
                            </FormFeedback>
                            <FormText>
                                Your username is most likely your email.
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Nachname</Label>
                            <Input
                                type="text"
                                name="nachname"
                                id="txtNachname"
                                placeholder="Nachname"
                                value={nachname}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your
                                email. Please input a correct email.
                            </FormFeedback>
                            <FormText>
                                Your username is most likely your email.
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                onChange={e => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default UserForm;
