import { SPFI, SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/column-defaults";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FormCustomizerContext, ListViewCommandSetContext } from "@microsoft/sp-listview-extensibility";
import { IFieldInfo } from "@pnp/sp/fields";

//#region CONST
export const DEATH_REGISTRATION_CONTENT_TYPE_ID = "0x0100DA81DCD717B72D499724C0023271F50C00D36BB2C588D851418CF8CEDFA4ED7036";
export const DEATH_REGISTRATION_LIST_ID = "05310795-3642-4f5f-b71f-47254e1108be";
export const DEATH_REGISTRATION_LIST_TITLE = "Death Registration";
//#endregion

let _sp: SPFI = null;

export const getSP = (context?: WebPartContext | ListViewCommandSetContext | FormCustomizerContext): SPFI => {
    if (_sp === null && context !== null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};

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

export const GetColumnDefaultValue = async (columnName:string) => {
    const field: IFieldInfo = await _sp.web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).fields.getByInternalNameOrTitle(columnName)();
    return field.DefaultValue;
}

/**
 * ! Random Number for now...
 */
export const GetNextRegistrationNumber = async (): Promise<number> => {
    return Math.floor(Math.random() * 100);
}

//#endregion
