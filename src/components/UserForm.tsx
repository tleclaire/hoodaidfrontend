import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import './Form.css';
import { IUser, DefaultUser } from './FetchUsers';
import { http } from '../Libs/http';
import { post } from '../Libs/http';
import { Redirect } from 'react-router';

interface IEmailState {
    emailState: string;
}

interface IFormState {
    toUsers: boolean;
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
            toUsers: false,
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
        await post('https://hoodaid20200321090450.azurewebsites.net/api/Users', user);
        this.setState({ toUsers: true });
    }

    render() {
        const { email, password, vorname, nachname, plz, ort, strasse } = this.state;
        if (this.state.toUsers === true) {
            return <Redirect to="/fetch-users" />;
        }

        return (
            <Container className="App">
                <h2>Registrierung</h2>
                <Form className="form" onSubmit={e => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Benutzername / Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={e => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your email. Please input a correct email.
                            </FormFeedback>
                            <FormText>Geben Sie als Benutzernamen Ihre Email Adresse ein.</FormText>
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
                            <FormText>Geben Sie ihren Nachnamen ein.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label>Vorname</Label>
                            <Input
                                type="text"
                                name="vorname"
                                id="txtVorname"
                                placeholder="Vorname"
                                value={vorname}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                            <FormText>Geben Sie ihren Vornamen ein.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label>PLZ</Label>
                            <Input
                                type="text"
                                name="plz"
                                id="txtPlz"
                                placeholder="PLZ"
                                value={plz}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                            <FormText>Geben Sie ihre PLZ ein.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ort</Label>
                            <Input
                                type="text"
                                name="ort"
                                id="txtOrt"
                                placeholder="Ort"
                                value={ort}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                            <FormText>Geben Sie ihren Wohnort ein.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label>Strasse Hausnr</Label>
                            <Input
                                type="text"
                                name="strasse"
                                id="txtStrasse"
                                placeholder="Strasse und Hausnr"
                                value={strasse}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                            <FormText>Geben Sie ihre Strasse und Hausnr ein.</FormText>
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
                    <Button>Speichern</Button>
                </Form>
            </Container>
        );
    }
}

export default UserForm;
