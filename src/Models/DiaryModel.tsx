import { Symptom } from './SymptomModel';
import { ContactPerson } from './ContactPersonModel';

export interface DiaryEntry {
    id?: number;
    time: Date | string;
    activity: string;
    temperature: number;
    symptoms: Symptom[];
    contacts: ContactPerson[];
}
