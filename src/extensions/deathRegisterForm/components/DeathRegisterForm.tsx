import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/security";
import DeathRegisterNewForm from '../../../Components/DeathRegisterNewForm';
import DeathRegisterDisplayForm from '../../../Components/DeathRegisterDisplayForm';
import '../../../Components/PrintStyles.css';

export interface IDeathRegisterFormProps {
  context: FormCustomizerContext | any;
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

  public render(): React.ReactElement<{}> {
    if (this.props.displayMode === FormDisplayMode.New) {
      return <DeathRegisterNewForm {...this.props} />
    }
    if (this.props.displayMode === FormDisplayMode.Display) {
      return <DeathRegisterDisplayForm {...this.props} />
    }

    return <div>hello world default!</div>;
  }
}
