import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { Depths } from '@fluentui/react';
import { getSP } from '../MyHelperMethods/MyHelperMethods';

export interface IDeathRegisterDisplayFormProps extends IDeathRegisterFormProps {
}

export interface IDeathRegisterDisplayFormState {

}

export default class DeathRegisterDisplayForm extends React.Component<IDeathRegisterDisplayFormProps, IDeathRegisterDisplayFormState> {
    constructor(props: any) {
        super(props);

    }

    private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        return (
            <div style={{
                marginLeft: '30px', marginRight: '30px', marginTop: '15px', marginBottom: '15px', padding: '15px', boxShadow: Depths.depth8
            }}>
                hello world... display form.
            </div >
        );
    }
}
