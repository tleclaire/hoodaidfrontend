import { IUser } from '../components/FetchUsers';

function formatUser(user: IUser): IUser {
  return {
    email: user.email,
    id: user.id,
    image: user.image,
    nachname: user.nachname,
    ort: user.ort,
    plz: user.plz,
    strasse: user.strasse,
    vorname: user.vorname,
  };
}

export class UserService {
  public getUsers(): Promise<IUser[]> {
    return fetch('http://localhost:5000/api/Users')
      .then(res => res.json())
      .then(res => res.map((user: IUser) => formatUser(user)));
  }
}
