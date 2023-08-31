import { SPFI, SPFx, spfi } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FormCustomizerContext, ListViewCommandSetContext } from "@microsoft/sp-listview-extensibility";


let _sp: SPFI = null;

export const getSP = (context?: WebPartContext | ListViewCommandSetContext | FormCustomizerContext): SPFI => {
    if (_sp === null && context !== null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};
