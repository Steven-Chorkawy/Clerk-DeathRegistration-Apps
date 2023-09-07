export default interface IDeathFormState {
    dayOfDeath: string;
    monthOfDeath: string;
    yearOfDeath: string | number;
    formattedRegistrationDate: string
}

export interface IForm18State extends IDeathFormState {
    dayOfRegistrationDate: string;
    monthOfRegistrationDate: string;
    yearOfRegistrationDate: string | number;
}