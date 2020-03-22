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
        return fetch('https://hoodaid20200321090450.azurewebsites.net/api/Users')
            .then(res => res.json())
            .then(res => res.map((user: IUser) => formatUser(user)));
    }
}
