import { ILabelStyles, IStyleSet, Label } from '@fluentui/react';
import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
// import { getSP } from '../MyHelperMethods/MyHelperMethods';

export default class Form18 extends React.Component<IDeathRegisterFormProps, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }

    //private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
            root: { marginTop: 10 },
        };
        return (
            <div>
                <Label styles={labelStyles}>Form 18...</Label>
            </div>
        );
    }
}
