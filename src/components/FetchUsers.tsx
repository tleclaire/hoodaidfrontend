import * as React from 'react';
import { Component } from 'react';

import { http } from '../Libs/http';
import { get } from 'http';
import { UserService } from '../Libs/UsersService';

export interface IUser {
  id: number;
  vorname: string;
  nachname: string;
  plz: string;
  ort: string;
  strasse: string;
  email: string;
  image: string;
}

interface IFetchUsersState {
  users: IUser[];
  loading: boolean;
}

export default class FetchUsers extends Component<{}, IFetchUsersState> {
  constructor(props: any) {
    super(props);
    this.state = { users: [], loading: true };
  }

  public componentDidMount(): void {
    // this.populateUserData();

    const apiClient = new UserService();
    apiClient.getUsers().then((itemsResult: IUser[]) => {
      console.log(itemsResult);
      this.setState({ users: itemsResult, loading: false });
    });
  }

  public async populateUserData() {
    const response = await fetch('api/Users');
    const data = await response.json();
    console.log(data);
    this.setState({ users: data, loading: false });
  }

  public renderUsersTable(users: IUser[]): React.ReactElement {
    return (
      <div>
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr key={0}>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Plz</th>
              <th>Ort</th>
              <th>Straße</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.vorname}</td>
                <td>{user.nachname}</td>
                <td>{user.plz}</td>
                <td>{user.ort}</td>
                <td>{user.strasse}</td>
                <td>{user.email}</td>
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
      this.renderUsersTable(this.state.users)
    );

    return (
      <div>
        <h1 id="tabelLabel">User</h1>
        <p>This component is fetching users from the server. Huhu</p>
        {contents}
      </div>
    );
  }

  //private async readUsers(): Promise<IUser[]> {
  //    return new Promise<IUser[]>((resolve, reject) => {
  //            let response = get("/api/users");
  //            let users: IUser[] = [];
  //            response
  //            resolve(users);
  //        }
  //    );
  //}
}
