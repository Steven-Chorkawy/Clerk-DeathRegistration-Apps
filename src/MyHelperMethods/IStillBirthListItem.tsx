export default interface IStillBirthListItem {
    Title: string;
    LastName?: string;
    FirstName?: string;
    MiddleName?: string;
    Sex?: string;
    DateOfDeath?: string;
    DeathLocation?: string;
    RegistrationDate?: string;
    RegistrationNumber?: number;
    Cause?: string;
    DoctorsInformation?: string;
    MotherInformation?: string;
    BurialPermitInformation?: string;
    FuneralHome?: string;
    FuneralDirectorName?: string;
    WaiveFee: boolean;
}
