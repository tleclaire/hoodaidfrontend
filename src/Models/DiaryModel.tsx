import { ContactPerson } from './ContactPersonModel';

export interface DiaryEntry {
    id?: number;
    time: Date;
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
}
