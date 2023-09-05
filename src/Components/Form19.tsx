import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
// import { getSP } from '../MyHelperMethods/MyHelperMethods';

export default class Form19 extends React.Component<IDeathRegisterFormProps, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }

    //private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <h1>Form 19</h1>
                <h3><em>Vital Statistics Act</em></h3>
                <h2>BURIAL PERMIT</h2>
                <p>Under the Vital Statistics Act and the regulations, and subject to the limitations thereof, this permit is granted to</p>
                <div>... real data here...</div>
                <p>for the Purpose of the Burial or other Disposition of the Body of</p>
                <div>{this.props.deathRegisterItem.LastName}, {this.props.deathRegisterItem.FirstName} {this.props.deathRegisterItem.MiddleName}</div>
                <p>who died at</p>
                <div>... real data here...</div>
                <div>on the ...FORMAT DATE HERE...</div>
            </div>
        );
    }
}
