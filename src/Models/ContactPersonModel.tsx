export interface ContactPerson {
    id: number;
    firstName: string;
    lastName: string;
    zip: string;
    city: string;
    streetName: string;
    email: string;
    telefon: string;
    gender: GenderType;
    duration: Number;
}

export enum GenderType {
    Male,
    Female,
    Diverse,
}
