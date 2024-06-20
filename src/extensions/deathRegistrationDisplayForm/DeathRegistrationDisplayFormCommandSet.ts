import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { COMMAND_VIEW_DEATH_RECORD } from '../../MyHelperMethods/MyHelperMethods';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDeathRegistrationDisplayFormCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'DeathRegistrationDisplayFormCommandSet';

export default class DeathRegistrationDisplayFormCommandSet extends BaseListViewCommandSet<IDeathRegistrationDisplayFormCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DeathRegistrationDisplayFormCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand(COMMAND_VIEW_DEATH_RECORD);
    compareOneCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    console.log('onExecute Event', event);
    console.log('context', this.context);
    switch (event.itemId) {
      case COMMAND_VIEW_DEATH_RECORD:
        window.open(`https://claringtonnet.sharepoint.com/sites/Clerk/_layouts/15/SPListForm.aspx?PageType=4&List=05310795%2D3642%2D4f5f%2Db71f%2D47254e1108be&ID=${event.selectedRows[0].getValueByName('ID')}&Source=https%3A%2F%2Fclaringtonnet%2Esharepoint%2Ecom%2Fsites%2FClerk%2FLists%2FDeathRegistration%2FGroup%2520by%2520Year%2Easpx%3Fviewid%3Dd2b0a444%252D3ec7%252D4aae%252Da3d2%252D938b10e050b8&ContentTypeId=${event.selectedRows[0].getValueByName('ContentTypeId')}&RootFolder=/sites/Clerk/Lists/DeathRegistration`, '_blank');
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand(COMMAND_VIEW_DEATH_RECORD);
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
