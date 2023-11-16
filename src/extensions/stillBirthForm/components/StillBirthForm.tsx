import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './StillBirthForm.module.scss';

export interface IStillBirthFormProps {
  context: FormCustomizerContext;
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
    return <div className={styles.stillBirthForm} />;
  }
}
