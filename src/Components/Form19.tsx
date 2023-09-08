import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
import { Stack, Text } from '@fluentui/react';
import { FormatTitle, ordinal_suffix_of } from '../MyHelperMethods/MyHelperMethods';
import IDeathFormState from '../MyHelperMethods/IDeathFormState';

export default class Form19 extends React.Component<IDeathRegisterFormProps, IDeathFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            dayOfDeath: ordinal_suffix_of(new Date(this.props.deathRegisterItem.DateOfDeath).getDate()),
            monthOfDeath: new Date(this.props.deathRegisterItem.DateOfDeath).toLocaleString('default', { month: 'long' }),
            yearOfDeath: new Date(this.props.deathRegisterItem.DateOfDeath).getFullYear(),
            formattedRegistrationDate: `${new Date(this.props.deathRegisterItem.RegistrationDate).toLocaleString('default', { month: 'long' })} ${new Date(this.props.deathRegisterItem.RegistrationDate).getDate()}, ${new Date(this.props.deathRegisterItem.RegistrationDate).getFullYear()}`
        }
    }

    public render(): React.ReactElement<{}> {
        const bold_font_style = { fontWeight: 'bold' };
        return (
            <div className='printable-page'>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <Text variant='xxLarge' style={{ marginTop: '20px' }}>Form 19</Text>
                    <Text variant='mediumPlus' style={{ marginTop: '20px' }}><i>Vital Statistics Act</i></Text>
                    <Text variant='xLargePlus' style={{ marginTop: '20px' }}>BURIAL PERMIT</Text>
                    <br />
                    <Text variant='small' style={{ marginTop: '10px', marginBottom: '10px' }}>Under the Vital Statistics Act and the regulations, and subject to the limitations thereof, this permit is granted to</Text>
                    <br />
                    <Text variant='mediumPlus' style={bold_font_style}>{this.props.deathRegisterItem.FuneralDirectorName}</Text>
                    <Text variant='mediumPlus' style={bold_font_style}>{JSON.parse(this.props.deathRegisterItem.FuneralHome)?.DisplayName}</Text>
                    <Text variant='mediumPlus' style={bold_font_style}>{JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address.Street}</Text>
                    <Text variant='mediumPlus' style={bold_font_style}>{JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address.City}, {JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address.State}  {JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address.PostalCode}</Text>
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <br />
                    <Text variant='small'>for the Purpose of the Burial or other Disposition of the Body of</Text>
                    <br />
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <Text variant='xLargePlus'>{FormatTitle(this.props.deathRegisterItem)}</Text>
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <br />
                    <Text variant='small'>who died at</Text>
                    <br />
                </Stack>
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <Text variant='mediumPlus' style={bold_font_style}>{this.props.deathRegisterItem.DeathLocation}</Text>
                </Stack>
                <br />
                <Stack horizontalAlign="center" style={{ textAlign: 'center' }}>
                    <Text>on the <Text variant='mediumPlus' style={bold_font_style}>{this.state.dayOfDeath}</Text> day of <Text variant='mediumPlus' style={bold_font_style}>{this.state.monthOfDeath}, {this.state.yearOfDeath}</Text></Text>
                </Stack>
                <br />
                <br />
                <Stack horizontalAlign='end' style={{ textAlign: 'right' }}>
                    <Text variant='small' style={{ borderTop: 'solid', marginBottom: '10px', width: '200px' }}>(signature of division registrar)</Text>
                    <Text variant='small' style={{ marginBottom: '10px' }}>Registration Division: <b>1811</b></Text>
                    <Text variant='small' style={{ marginBottom: '10px' }}><b>{this.state.formattedRegistrationDate}</b></Text>
                </Stack>
            </div>
        );
    }
}
