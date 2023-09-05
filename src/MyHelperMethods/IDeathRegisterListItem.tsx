export default interface IDeathRegisterListItem {
    Title: string;
    LastName?: string;
    FirstName?: string;
    MiddleName?: string;
    Sex?: string;
    DateOfDeath?: string;
    Age?: number;
    DeathLocation?: string;
    RegistrationDate?: string;
    RegistrationNumber?: number;
    Cause?: string;
    DoctorsInformation?: string;
    InformantsInformation?: string;
    InformantsRelationship?: string;
    FuneralHome?: string;
    FuneralDirectorName?: string;
    WaiveFee: boolean;
}
