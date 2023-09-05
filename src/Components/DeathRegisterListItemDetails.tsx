import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
// import { getSP } from '../MyHelperMethods/MyHelperMethods';

export default class DeathRegisterListItemDetails extends React.Component<IDeathRegisterFormProps, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }

    //private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <h2>Subject's Information</h2>
                <h2>Doctor's Information</h2>
                <h2>Informant's Information</h2>
                <h2>Funeral Home Information</h2>
            </div>
        );
    }
}
