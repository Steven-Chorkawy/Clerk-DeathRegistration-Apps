import { VitalStatsContentTypeNames, VitalStatsContentTypeIDs } from "./VitalStatsContentTypes";

export default interface IStillAndDeathRegisterListItem {
    // Common Fields
    ContentType: VitalStatsContentTypeNames;
    ContentTypeId: VitalStatsContentTypeIDs;
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
    FuneralHome?: string;
    FuneralDirectorName?: string;
    WaiveFee: boolean;

    // Still Birth Fields
    MotherName?: string;
    MotherAddress?: string;
    BurialPermitInformation?: string;
    
    // Death Reg Fields
    Age?: number;
    InformantsInformation?: string;
    InformantsRelationship?: string;
}
