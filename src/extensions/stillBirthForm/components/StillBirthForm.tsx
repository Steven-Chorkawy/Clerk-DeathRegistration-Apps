import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import StillBirthRegistrationNewForm from '../../../Components/StillBirthRegistrationNewForm';
import StillBirthDisplayForm from '../../../Components/StillBirthDisplayForm';
import '../../../Components/PrintStyles.css';


export interface IStillBirthFormProps {
  context: FormCustomizerContext | any;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'StillBirthForm';

export default class StillBirthForm extends React.Component<IStillBirthFormProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: StillBirthForm mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: StillBirthForm unmounted');
  }

  public render(): React.ReactElement<{}> {
    if (this.props.displayMode === FormDisplayMode.New) {
      return <StillBirthRegistrationNewForm {...this.props} />
    }
    if (this.props.displayMode === FormDisplayMode.Display) {
      return <StillBirthDisplayForm {...this.props} />
    }

    return <div>Something went wrong! Please contact helpdesk@clarington.net!</div>;
  }
}
