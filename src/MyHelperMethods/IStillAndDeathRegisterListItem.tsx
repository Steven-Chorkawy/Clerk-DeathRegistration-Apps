import { VitalStatsContentTypeNames, VitalStatsContentTypeIDs } from "./VitalStatsContentTypes";

// This interface represents the object that we will save to SharePoint.
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
    OtherDeathLocation?:string;
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

// This interface represents the object that we get when querying SharePoint for an existing record. 
export interface IStillAndDeathRegisterListItem_FromList extends IStillAndDeathRegisterListItem {
    Fee: string;
    AuthorId: number;
    EditorId: number;
    DispName: string;// Name of the funeral home. 
    ID: number;
    // more fields but I will add them as needed. 
}
