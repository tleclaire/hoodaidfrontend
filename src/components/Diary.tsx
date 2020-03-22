import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import './Form.css';
import { IUser, DefaultUser } from './FetchUsers';
import { http } from '../Libs/http';
import { post } from '../Libs/http';
import { DiaryEntry } from '../Models/DiaryModel';
import { Symptom } from '../Models/SymptomModel';
import { ContactPerson } from '../Models/ContactPersonModel';

interface IEmailState {
    emailState: string;
}

interface IFormState {
    loading: boolean;
    activity: string;
    temperature: number;
    symptoms: string[];
    contacts: ContactPerson[];
    time: Date | string;
    symptomsfromDB: Symptom[];
    validate: IEmailState;
    [key: string]: any;
}

class DiaryForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            activity: '',
            symptoms: [],
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

    handleChange = async (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        let value: any;
        switch (target.type) {
            case 'checkbox':
                value = target.checked;
                break;
            case 'select-multiple':
                var selectElement = event.target as HTMLSelectElement;
                var options = selectElement.options;
                value = [];
                for (var i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                        value.push(options[i].value);
                    }
                }
                break;
            default:
                value = target.value;
                break;
        }
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    };

    private formatDiary(state: IFormState): DiaryEntry {
        return {
            time: state.time,
            activity: state.activity,
            temperature: state.temperature,
            symptoms: [
                { name: 'Hallo', value: 10 },
                { name: 'Huhu', value: 5 },
            ],
            contacts: state.contacts,
        };
    }

    //'https://hoodaid20200321090450.azurewebsites.net/api/DiaryEntries',
    //'http://localhost:5000/api/DiaryEntries'
    async submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let diaryEntry: DiaryEntry = this.formatDiary(this.state);
        await post('https://hoodaid20200321090450.azurewebsites.net/api/DiaryEntries', diaryEntry);
    }

    public componentDidMount(): void {
        this.populateSymptomData();
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
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={e => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Aktivität</Label>
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
                            <Label>Temperatur</Label>
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
                        <FormGroup>
                            <Label for="exampleSelectMulti">Symptome</Label>
                            <Input
                                type="select"
                                name="symptoms"
                                id="multiSelectSymptome"
                                value={this.state.symptoms}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                                multiple
                            >
                                {this.state.symptomsfromDB.map((symptom, index) => (
                                    <option key={index}>{symptom.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default DiaryForm;
