import { TextField } from '@fluentui/react';
import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';

export interface IDeathRegisterNewFormProps extends IDeathRegisterFormProps {
}

export default class DeathRegisterNewForm extends React.Component<IDeathRegisterNewFormProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        return (
            <div style={{ padding: '50px' }}>
                <div>
                    <TextField label="Folder Name" id={'myTestName'} />
                    <br />
                    {/* <PrimaryButton text="Click Me" onClick={this._onSave} /> */}
                </div>
            </div>
        );
    }
}
