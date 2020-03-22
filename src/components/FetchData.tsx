import * as React from 'react';
import { Component } from 'react';

interface IForeCast {
    date: string;
    temperatureC: string;
    temperatureF: string;
    summary: string;
}

interface IFetchDataState {
    forecasts: IForeCast[];
    loading: boolean;
}

export class FetchData extends Component<{}, IFetchDataState> {
    static displayName = FetchData.name;

    constructor(props: IFetchDataState) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    public componentDidMount(): void {
        this.populateWeatherData();
    }

    public static renderForecastsTable(
        forecasts: IForeCast[],
    ): React.ReactElement {
        return (
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast => (
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    public render(): React.ReactElement {
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            FetchData.renderForecastsTable(this.state.forecasts)
        );

        return (
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>
                    This component demonstrates fetching data from the server.
                </p>
                {contents}
            </div>
        );
    }

    //http://localhost:5000/weatherforecast
    public async populateWeatherData() {
        const response = await fetch(
            'https://hoodaid20200321090450.azurewebsites.net/weatherforecast',
        );
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
