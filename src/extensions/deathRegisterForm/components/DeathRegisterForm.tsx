import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { PrimaryButton, TextField } from '@fluentui/react';
import { getSP } from '../../../MyHelperMethods/MyHelperMethods';
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/security";

export interface IDeathRegisterFormProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'DeathRegisterForm';

export default class DeathRegisterForm extends React.Component<IDeathRegisterFormProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: DeathRegisterForm mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: DeathRegisterForm unmounted');
  }

  private _onSave = async (input: any): Promise<void> => {
    // const folderName = (document.getElementById('myTestName') as HTMLInputElement).value;
    // const sp = getSP();
    // const DOC_SET_CONTENT_TYPE_ID = '0x0120D52000CBB7B6637D3D6B4AB03A351A077DDF8200E823759939E2CD40B5D8A8FD2CB82F14';

    // let newFolderResult = await sp.web.folders.addUsingPath(`/sites/StevensTestSite/NameTest/${folderName}`);

    // const newFolderProps = await sp.web.getFolderByServerRelativePath(newFolderResult.data.ServerRelativeUrl).listItemAllFields();
    // await sp.web.lists.getByTitle('NameTest').items.getById(newFolderProps.ID).update({
    //   ContentTypeId: DOC_SET_CONTENT_TYPE_ID
    // });

    alert('End of method.  This is just a test so nothing happened :)');

    this.props.onSave;
  }

  public render(): React.ReactElement<{}> {
    if (this.props.displayMode === FormDisplayMode.New) {
      return <div style={{ padding: '50px' }}>
        <div>hello world new form.</div>
        <div>
          <TextField label="Folder Name" id={'myTestName'} />
          <br />
          <PrimaryButton text="Click Me" onClick={this._onSave} />
        </div>
      </div>;
    }
    if (this.props.displayMode === FormDisplayMode.Display) {
      return <div>hello world... display form.</div>;
    }

    return <div>hello world default!</div>;
  }
}
