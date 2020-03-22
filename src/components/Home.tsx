import * as React from 'react';
import { Component } from 'react';
import logo from './wirvsvirus.png';

export class Home extends Component {
    static displayName = Home.name;

    public render(): React.ReactElement {
        return (
            <div>
                <h1>Hello und herzlich Willkommen!</h1>
                <h5>Dies ist eine WirVsVirus Website zur Digitalen Krankheits-Anamnese.</h5>
                <p> </p>
                <p>Diese Seite soll zur digitalen Erfassung von Krankheutsverläufen potentieller Erkrankter dienen.</p>
                <p>
                    Sie können sich hier registrieren, oder wenn Sie dies schon haben, anmelden und mehrmals täglich
                    Ihre Symptome und mehr an Ihr zuständiges Gesundheitsamt senden. Somit stellen wir zum einen Sicher,
                    dass Sie die best mögliche Betreuung erhalten, aber auch, dass die momentan überlasteten
                    Gesundheitsämter etwas entlastet werden.
                </p>
                <p>
                    Sollten Sie nicht genau wissen, welchem Gesundheitsamt Sie zugeordnet sind, können Sie dies
                    problemlos{' '}
                    <a href="https://tools.rki.de/PLZTool/" target="_blank">
                        hier
                    </a>{' '}
                    überprüfen.
                </p>
                <p>Diese Seite ist im Rahmen des #wirvsvirus Hackerthon entstanden.</p>
                <img src={logo} alt="logo" />
            </div>
        );
    }
}
