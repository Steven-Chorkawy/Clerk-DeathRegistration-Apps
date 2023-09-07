import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
import { Stack, Text, TextField } from '@fluentui/react';
import { IForm17State } from '../MyHelperMethods/IDeathFormState';

export default class Form17 extends React.Component<IDeathRegisterFormProps, IForm17State> {
    constructor(props: any) {
        super(props);
        this.state = {
            registrationDivision: '',
            addressOfDeceased: ''
        };
    }


    public render(): React.ReactElement<{}> {
        const itemStyles: React.CSSProperties = {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        };
        const borderStackStyle: React.CSSProperties = {
            borderBottom: 'solid',
            borderWidth: 'thin',
            marginBottom: '0.5em',
            paddingBottom: '0.5em'
        };
        return (
            <div style={{ width: '6.75in', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className='no-print'>
                    <TextField id='registrationDivision' name='registrationDivision' label='Registration Division' onChange={(e, newValue) => this.setState({ registrationDivision: newValue })} />
                    <TextField id='addressOfDeceased' name='addressOfDeceased' label='Address of Deceased' onChange={(e, newValue) => this.setState({ addressOfDeceased: newValue })} />
                    <hr />
                    <br /><br />
                </div>
                <Stack horizontal horizontalAlign="space-between">
                    <span style={itemStyles}>
                        <Text variant='medium' style={{ textAlign: 'left' }}>Office of the Registrar General</Text>
                    </span>
                    <span style={itemStyles}>
                        <Text variant='medium' style={{ textAlign: 'right' }}>Form 17 Vital Statistics Act</Text>
                    </span>
                </Stack>
                <Stack>
                    <Text variant='large' style={{ marginTop: '20px' }}>Notice of Registration of Death or Still Birth to the Division Registrar of {this.state.registrationDivision}</Text>
                    <Text variant='small' style={{ marginTop: '1em', marginBottom: '1em' }}>The following are the particulars of a death or stillbirth that occurred in your division but that has been registered by this office:</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>1. Name of Deceased:</b> {this.props.deathRegisterItem.LastName}, {this.props.deathRegisterItem.FirstName} {this.props.deathRegisterItem.MiddleName}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>or Name of Stillborn Child:</b></Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>2. Date of Death:</b>{this.props.deathRegisterItem.DateOfDeath}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>3. Sex:</b> {this.props.deathRegisterItem.Sex}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>4. Place of Death:</b> {this.props.deathRegisterItem.DeathLocation}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>5. Address:</b> {this.state.addressOfDeceased}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>6. Cause of Death:</b> {this.props.deathRegisterItem.Cause}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>7. Name and Address of Informant:</b></Text>
                    <Text>{this.props.deathRegisterItem.InformantsInformation}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>8. Name and Address of Doctor:</b></Text>
                    <Text>{this.props.deathRegisterItem.DoctorsInformation}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>9. Name and Address of Funeral Director</b></Text>
                    <Text>{this.props.deathRegisterItem.FuneralDirectorName}</Text>
                    <Text>{JSON.parse(this.props.deathRegisterItem.FuneralHome).DisplayName}</Text>
                    <Text>{JSON.parse(this.props.deathRegisterItem.FuneralHome).Address.Street}, {JSON.parse(this.props.deathRegisterItem.FuneralHome).Address.City}, {JSON.parse(this.props.deathRegisterItem.FuneralHome).Address.State}  {JSON.parse(this.props.deathRegisterItem.FuneralHome).Address.PostalCode}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>10. Date of Registration:</b> {this.props.deathRegisterItem.RegistrationDate}</Text>
                </Stack>

                <Stack style={borderStackStyle} horizontalAlign='space-between'>
                    <span style={itemStyles}>
                        <Text variant='small' style={{ textAlign: 'left' }}>(Signature of Division Registrar)</Text>
                    </span>
                    <span style={itemStyles}>
                        <Text variant='small'>Registration Division <br /><b>1811</b></Text>
                    </span>
                    <span style={itemStyles}>
                        <Text variant='small' style={{ textAlign: 'right' }}>(month by name)(day)(year)<br /><b>{this.props.deathRegisterItem.RegistrationDate}</b></Text>
                    </span>
                </Stack>
            </div>
        );
    }
}
