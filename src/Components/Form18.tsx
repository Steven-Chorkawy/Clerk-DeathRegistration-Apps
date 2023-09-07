import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
import { Stack, Text } from '@fluentui/react';
import { IForm18State } from '../MyHelperMethods/IDeathFormState';
import { ordinal_suffix_of } from '../MyHelperMethods/MyHelperMethods';

export default class Form18 extends React.Component<IDeathRegisterFormProps, IForm18State> {
    constructor(props: any) {
        super(props);

        this.state = {
            dayOfDeath: ordinal_suffix_of(new Date(this.props.deathRegisterItem.DateOfDeath).getDay()),
            monthOfDeath: new Date(this.props.deathRegisterItem.DateOfDeath).toLocaleString('default', { month: 'long' }),
            yearOfDeath: new Date(this.props.deathRegisterItem.DateOfDeath).getFullYear(),
            formattedRegistrationDate: `${new Date(this.props.deathRegisterItem.RegistrationDate).toLocaleString('default', { month: 'long' })} ${new Date(this.props.deathRegisterItem.RegistrationDate).getDay()}, ${new Date(this.props.deathRegisterItem.RegistrationDate).getFullYear()}`,

            dayOfRegistrationDate: ordinal_suffix_of(new Date(this.props.deathRegisterItem.RegistrationDate).getDay()),
            monthOfRegistrationDate: new Date(this.props.deathRegisterItem.RegistrationDate).toLocaleString('default', { month: 'long' }),
            yearOfRegistrationDate: new Date(this.props.deathRegisterItem.RegistrationDate).getFullYear()
        };
    }

    public render(): React.ReactElement<{}> {
        const bold_font_style = { fontWeight: 'bold' };
        const itemStyles: React.CSSProperties = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        };
        return (
            <div>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <Text variant='xxLarge' style={{ marginTop: '20px' }}>Form 18</Text>
                    <Text variant='mediumPlus' style={{ marginTop: '20px' }}><i>Vital Statistics Act</i></Text>
                    <Text variant='xLargePlus' style={{ marginTop: '20px' }}>ACKNOWLEDGEMENT OF REGISTRATION OF DEATH</Text>
                    <br />
                    <Text variant='small' style={{ marginTop: '10px', marginBottom: '10px' }}>Under the Vital Statistics Act and the regulations, I acknowledge the registration of the death of</Text>
                    <br />
                    <Text variant='mediumPlus' style={bold_font_style}>{this.props.deathRegisterItem.LastName}</Text>
                    <Text variant='mediumPlus' style={bold_font_style}>{this.props.deathRegisterItem.FirstName} {this.props.deathRegisterItem.MiddleName}</Text>
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <br />
                    <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                        <Text>on the <Text variant='mediumPlus' style={bold_font_style}>{this.state.dayOfDeath}</Text> day of <Text variant='mediumPlus' style={bold_font_style}>{this.state.monthOfDeath}, {this.state.yearOfDeath}</Text></Text>
                    </Stack>
                    <br />
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <br />
                    <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                        <Text>Dated at The Municipality of Clarington, this <Text variant='mediumPlus' style={bold_font_style}>{this.state.dayOfRegistrationDate}</Text> day of <Text variant='mediumPlus' style={bold_font_style}>{this.state.monthOfRegistrationDate}</Text>, <Text variant='mediumPlus' style={bold_font_style}>{this.state.yearOfRegistrationDate}</Text></Text>
                    </Stack>
                    <br />
                </Stack>
                <br />
                <br />
                <Stack horizontal horizontalAlign="space-evenly">
                    <span style={{ ...itemStyles }}>
                        <Text variant='small' style={{ marginBottom: '10px' }}>Registration Division: <b>1811</b></Text>
                    </span>
                    <span style={{ ...itemStyles, textAlign: 'right' }}>
                        <Text variant='small' style={{ borderTop: 'solid', marginBottom: '10px', width: '200px' }}>(signature of division registrar)</Text>
                    </span>
                </Stack>
            </div>
        );
    }
}
