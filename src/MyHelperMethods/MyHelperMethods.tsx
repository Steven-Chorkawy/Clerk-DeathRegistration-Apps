import { SPFI, SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/column-defaults";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IFieldInfo } from "@pnp/sp/fields";
import "@pnp/sp/items/get-all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FormCustomizerContext, ListViewCommandSetContext } from "@microsoft/sp-listview-extensibility";
import IStillAndDeathRegisterListItem from "./IStillAndDeathRegisterListItem";
import { VitalStatsContentTypeIDs } from "./VitalStatsContentTypes";

//#region CONST
export const DEATH_REGISTRATION_CONTENT_TYPE_ID = "0x0100DA81DCD717B72D499724C0023271F50C00D36BB2C588D851418CF8CEDFA4ED7036";
export const DEATH_REGISTRATION_LIST_ID = "05310795-3642-4f5f-b71f-47254e1108be";
export const DEATH_REGISTRATION_LIST_TITLE = "Death Registration";
// This is used to help iterate through months using the SharePoint month parser/formatter.
export const MY_MONTHS = [
    "01-January",
    "02-February",
    "03-March",
    "04-April",
    "05-May",
    "06-June",
    "07-July",
    "08-August",
    "09-September",
    "10-October",
    "11-November",
    "12-December"
];
//#endregion

let _sp: SPFI = null;

export const getSP = (context?: WebPartContext | ListViewCommandSetContext | FormCustomizerContext): SPFI => {
    if (_sp === null && context !== null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};

//#region Formaters
export const FormatTitle = (dr: IStillAndDeathRegisterListItem): string => {
    // Default format: Last, First
    let output = `${dr.LastName.trim()}, ${dr.FirstName.trim()}`;

    // Only if Middle Name is present will the format be: Last, First Middle.
    if (dr.MiddleName) {
        output = `${output} ${dr.MiddleName.trim()}`;
    }

    return output.trim();
}

export const printPageArea = (areaID: string): void => {
    const printContent = document.getElementById(areaID).innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

// Copied from here: https://stackoverflow.com/a/13627586
export const ordinal_suffix_of = (i: number): string => {
    const j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

/**
 * Format date as full month name, date, and full year. 
 * EX: January 1, 2024
 * @param i Date as string
 * @returns Formatted date as a string.
 */
export const MyDateFormat1 = (i: string): string => {
    return new Date(i).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Format date as yyyy-mm-dd
 * EX: 2024-01-01
 * @param i Date as string
 * @returns Formatted date as a string.
 */
export const MyDateFormat2 = (i: string): string => {
    return new Date(i).toISOString().slice(0, 10);
}

/**
 * https://stackoverflow.com/a/62765924
 */
export const GroupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);

export const FormatCurrency = (i: number): string => {
    return i.toLocaleString('en-US', { style: 'currency', currency: 'USD', });
}
//#endregion

//#region Read Methods
export const GetChoiceColumn = async (listTitle: string, columnName: string): Promise<string[]> => {
    const sp = getSP();
    try {
        const choiceColumn: any = await sp.web.lists.getByTitle(listTitle).fields.getByTitle(columnName).select('Choices')();
        return choiceColumn.Choices;
    } catch (error) {
        console.error('Something went wrong in GetChoiceColumn!');
        console.error(error);
        return [];
    }
};

export const GetColumnDefaultValue = async (columnName: string): Promise<string> => {
    const field: IFieldInfo = await _sp.web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).fields.getByInternalNameOrTitle(columnName)();
    return field.DefaultValue;
}

/**
 * Generate the next valid Registration Number for Death Registrations or Still Births.
 * @param contentType VitalStatsContentTypes enum.
 * @returns The next valid Registration Number for the current year as a number type.
 */
export const GetNextRegistrationNumber = async (contentType: VitalStatsContentTypeIDs): Promise<number> => {
    let nextRegistrationNumber = 1;

    // Get all the current death regs from this year. 
    const camlQuery = `
    <View>
        <Query>
            <Where>
                <And>
                    <And>
                        <Eq>
                            <FieldRef Name="Year"/>
                            <Value Type="Text">${new Date().getFullYear()}</Value>
                        </Eq>
                        <Eq>
                            <FieldRef Name="ContentTypeId"/>
                            <Value Type="Text">${contentType}</Value>
                        </Eq>
                    </And>
                    <Neq>
                        <FieldRef Name='Duplicate'/>
                        <Value Type='Boolean'>1</Value>
                    </Neq>
                </And>
            </Where>
            <OrderBy>
                <FieldRef Name='RegistrationNumber' Ascending='False' />
            </OrderBy>
        </Query>
        <RowLimit>1</RowLimit>
    </View>`;

    const currentDeathRegistrations = await _sp.web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).getItemsByCAMLQuery({ ViewXml: camlQuery });

    if (!currentDeathRegistrations)
        throw Error("Could not fetch next registration number.");

    if (currentDeathRegistrations.length > 0)
        nextRegistrationNumber += currentDeathRegistrations[0].RegistrationNumber;

    return nextRegistrationNumber;
}

export const GetRegistrationReport = async (fromDate: Date, toDate: Date, contentType: VitalStatsContentTypeIDs) => {
    const camlQuery =
        `
<View>
    <Query>
        <Where>
            <And>
                <And>
                    <Eq>
                        <FieldRef Name='ContentTypeId'/>
                        <Value Type='Text'>${contentType}</Value>
                    </Eq>
                    <Neq>
                        <FieldRef Name='Duplicate'/>
                        <Value Type='Boolean'>1</Value>
                    </Neq>
                </And>                
                <And>
                    <Geq>
                        <FieldRef Name='RegistrationDate'/>
                        <Value Type='DateTime'>${fromDate.toISOString()}</Value>
                    </Geq>
                    <Leq>
                        <FieldRef Name='RegistrationDate'/>
                        <Value Type='DateTime'>${toDate.toISOString()}</Value>
                    </Leq>
                </And>
            </And>
        </Where>
    </Query>
</View>
`;

    try {
        let items = await getSP().web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).getItemsByCAMLQuery({ ViewXml: camlQuery });

        return items;
    } catch (error) {
        alert('ERROR!  Failed to complete query.  Please refresh your page and try again.');
        console.error(error);
        return null;
    }
};

export const GetRegistrationReportByMonth = async (year: number, contentType: VitalStatsContentTypeIDs) => {
    const YEAR_START_DATE: Date = new Date(year, 0, 1);
    const YEAR_END_DATE: Date = new Date(year, 11, 31);
    let output = await GetRegistrationReport(YEAR_START_DATE, YEAR_END_DATE, contentType);
    return output;
}
//#endregion
