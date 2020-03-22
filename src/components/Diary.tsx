import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import './Form.css';
import { IUser, DefaultUser } from './FetchUsers';
import { http } from '../Libs/http';
import { post } from '../Libs/http';
import { DiaryEntry } from '../Models/DiaryModel';
import { Symptom } from '../Models/SymptomModel';
import { ContactPerson } from '../Models/ContactPersonModel';
import { Redirect } from 'react-router';

interface IEmailState {
    emailState: string;
}

interface IFormState {
    loading: boolean;
    activity: string;
    temperature: number;
    husten: boolean;
    kurzatmigkeit: boolean;
    atemnot: boolean;
    gliederschmerzen: boolean;
    durchfall: boolean;
    geruchssinnVerlust: boolean;
    muedigkeit: boolean;
    contacts: ContactPerson[];
    time: Date;
    symptomsfromDB: Symptom[];
    validate: IEmailState;
    [key: string]: any;
}

class DiaryForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            toDiary: false,
            activity: '',
            atemnot: false,
            durchfall: false,
            geruchssinnVerlust: false,
            gliederschmerzen: false,
            husten: false,
            kurzatmigkeit: false,
            muedigkeit: false,
            contacts: [],
            temperature: 36,
            time: new Date(),
            symptomsfromDB: [],
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
        const { name } = target;
        let value: any;
        switch (target.type) {
            case 'checkbox':
                value = target.checked;
                break;
            case 'select-multiple':
                var selectElement = event.target as HTMLSelectElement;
                var options = selectElement.options;
                for (var i = 0, l = options.length; i < l; i++) {
                    if (options[i].title === name) {
                        value = options[i].selected;
                    }
                }
                break;
            default:
                value = target.value;
                break;
        }
        await this.setState({
            [name]: value,
        });
    };

    private formatDiary(state: IFormState): DiaryEntry {
        return {
            time: state.time,
            activity: state.activity,
            temperature: state.temperature,
            husten: state.husten,
            kurzatmigkeit: state.kurzatmigkeit,
            atemnot: state.atemnot,
            gliederschmerzen: state.gliederschmerzen,
            durchfall: state.durchfall,
            geruchssinnVerlust: state.geruchssinnVerlust,
            muedigkeit: state.muedigkeit,
            contacts: state.contacts,
        };
    }

    //'https://hoodaid20200321090450.azurewebsites.net/api/DiaryEntries',
    //'http://localhost:5000/api/DiaryEntries'
    async submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let diaryEntry: DiaryEntry = this.formatDiary(this.state);
        await post('https://hoodaid20200321090450.azurewebsites.net/api/DiaryEntries', diaryEntry);
        this.setState({ toDiary: true });
    }

    public componentDidMount(): void {
        //this.populateSymptomData();
    }

    public async populateSymptomData() {
        const response = await fetch('https://hoodaid20200321090450.azurewebsites.net/api/Symptoms');
        const data = await response.json();
        console.log(data);
        let mySymptoms: string[] = [];
        this.setState({ symptomsfromDB: data, loading: false });
        this.state.symptomsfromDB.map(symptom => mySymptoms.push(symptom.name));
        this.setState({ symptoms: mySymptoms });
    }

    render() {
        if (this.state.toDiary === true) {
            return <Redirect to="/diary" />;
        }

        return (
            <Container className="App">
                <h2>Gesundheitstagebuch</h2>
                <Form className="form" onSubmit={e => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Ihre heutige Aktivität</Label>
                            <Input
                                type="text"
                                name="activity"
                                id="txtActivity"
                                placeholder="Was haben Sie heute gemacht?"
                                value={this.state.activity}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Ihre gemessene Temperatur</Label>
                            <Input
                                type="number"
                                name="temperature"
                                id="txtTemperature"
                                placeholder="Ihre gemessene Temperatur"
                                value={this.state.temperature}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <Label>Heutige Symptome</Label>
                        <FormGroup>
                            <Col>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.husten}
                                        name="husten"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Husten
                                </Label>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.kurzatmigkeit}
                                        name="kurzatmigkeit"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Kurzatmitgkeit
                                </Label>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.atemnot}
                                        name="atemnot"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Atemnot
                                </Label>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.gliederschmerzen}
                                        name="gliederschmerzen"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Gliederschmerzen
                                </Label>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.durchfall}
                                        name="durchfall"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Durchfall
                                </Label>
                            </Col>
                            <Col>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.geruchssinnVerlust}
                                        name="geruchssinnVerlust"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Verlust des Geruchssinns
                                </Label>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        selected={this.state.muedigkeit}
                                        name="muedigkeit"
                                        onChange={e => {
                                            this.handleChange(e);
                                        }}
                                    />
                                    Müdigkeit
                                </Label>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Button>Speichern</Button>
                </Form>
            </Container>
        );
    }
}

export default DiaryForm;
