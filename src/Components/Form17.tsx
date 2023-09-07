import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
import { Stack, Text, TextField } from '@fluentui/react';
import { IForm17State } from '../MyHelperMethods/IDeathFormState';

export default class Form17 extends React.Component<IDeathRegisterFormProps, IForm17State> {
    constructor(props: any) {
        super(props);

    }


    public render(): React.ReactElement<{}> {
        const itemStyles: React.CSSProperties = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        };
        return (
            <div>
                <div className='no-print'>
                    <TextField id='registrationDivision' name='registrationDivision' onChange={(e, newValue) => this.setState({ registrationDivision: newValue })} />
                    <TextField id='addressOfDeceased' name='addressOfDeceased' onChange={(e, newValue) => this.setState({ addressOfDeceased: newValue })} />
                    <hr />
                    <br /><br />
                </div>
                <Stack horizontal horizontalAlign="space-evenly">
                    <span style={itemStyles}>
                        <Text variant='medium' style={{ textAlign: 'left' }}>Office of the Registrar General</Text>
                    </span>
                    <span style={itemStyles}>
                        <Text variant='medium' style={{ textAlign: 'right' }}>Form 17 Vital Statistics Act</Text>
                    </span>
                </Stack>
                <Stack>
                    <Text variant='xxLarge' style={{ marginTop: '20px' }}>Notice of Registration of Death or Still Birth to the Division Registrar of {this.state.registrationDivision}</Text>
                </Stack>
            </div>
        );
    }
}
