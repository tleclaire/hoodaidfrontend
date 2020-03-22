import * as React from 'react';
import { Component } from 'react';

import { DiaryEntry } from '../Models/DiaryModel';

interface IState {
    entries: DiaryEntry[];
    loading: boolean;
}

export default class FetchDiary extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { entries: [], loading: true };
    }

    public componentDidMount(): void {
        this.populateData();

        // const apiClient = new UserService();
        // apiClient.getUsers().then((itemsResult: IUser[]) => {
        //     console.log(itemsResult);
        //     this.setState({ users: itemsResult, loading: false });
        // });
    }

    public async populateData() {
        const response = await fetch('https://hoodaid20200321090450.azurewebsites.net/api/DiaryEntries');
        const data = await response.json();
        console.log(data);
        this.setState({ entries: data, loading: false });
    }

    public renderUsersTable(entries: DiaryEntry[]): React.ReactElement {
        return (
            <div>
                <table className="table table-striped" aria-labelledby="tabelLabel">
                    <thead>
                        <tr key={0}>
                            <th>Datum</th>
                            <th>Aktivität</th>
                            <th>Temperatur</th>
                            <th>Husten</th>
                            <th>Kurzatmigkeit</th>
                            <th>Atemnot</th>
                            <th>Gliederschmerzen</th>
                            <th>Durchfall</th>
                            <th>Geruchssinnverlust</th>
                            <th>Müdigkeit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(entry => (
                            <tr key={entry.id}>
                                <td>{entry.time}</td>
                                <td>{entry.activity}</td>
                                <td>{entry.temperature}</td>
                                <td>{entry.husten ? 'Ja' : 'Nein'}</td>
                                <td>{entry.kurzatmigkeit ? 'Ja' : 'Nein'}</td>
                                <td>{entry.atemnot ? 'Ja' : 'Nein'}</td>
                                <td>{entry.gliederschmerzen ? 'Ja' : 'Nein'}</td>
                                <td>{entry.durchfall ? 'Ja' : 'Nein'}</td>
                                <td>{entry.geruchssinnVerlust ? 'Ja' : 'Nein'}</td>
                                <td>{entry.muedigkeit ? 'Ja' : 'Nein'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    public render(): React.ReactElement {
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderUsersTable(this.state.entries)
        );

        return (
            <div>
                <h1 id="tabelLabel">Tagebuch</h1>
                <p>Die letzten Tagebucheinträge</p>
                {contents}
            </div>
        );
    }
}
