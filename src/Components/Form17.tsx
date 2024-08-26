import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IRegisterFormProps';
import { Stack, Text, TextField } from '@fluentui/react';
import { IForm17State } from '../MyHelperMethods/IDeathFormState';
import { FormatDeathLocation, FormatTitle, MyDateFormat1 } from '../MyHelperMethods/MyHelperMethods';
import { VitalStatsContentTypeIDs } from '../MyHelperMethods/VitalStatsContentTypes';

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
                    <TextField
                        id='registrationDivision' name='registrationDivision' label='Registration Division'
                        onChange={(e, newValue) => this.setState({ registrationDivision: newValue })}
                    />
                    {
                        this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration &&
                        <TextField
                            id='addressOfDeceased' name='addressOfDeceased' label='Address of Deceased'
                            onChange={(e, newValue) => this.setState({ addressOfDeceased: newValue })}
                        />
                    }
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
                    <Text variant='xLarge' style={{ marginTop: '20px' }}>Notice of Registration of Death or Still Birth to the Division Registrar of {this.state.registrationDivision}</Text>
                    <Text variant='small' style={{ marginTop: '1em', marginBottom: '1em' }}>The following are the particulars of a death or stillbirth that occurred in your division but that has been registered by this office:</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>1. Name of Deceased:</b> {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration && FormatTitle(this.props.registerItem)}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>or Name of Stillborn Child:</b> {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.StillBirth && FormatTitle(this.props.registerItem)}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text>
                        <b>2. Date of Death:</b> {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration && MyDateFormat1(this.props.registerItem.DateOfDeath)}
                    </Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>or Date of Still Birth:</b> {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.StillBirth && MyDateFormat1(this.props.registerItem.DateOfDeath)}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>3. Sex:</b> {this.props.registerItem.Sex}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>4. Place of Death:</b> {FormatDeathLocation(this.props.registerItem)}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text>
                        <b>
                            {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration && "5. Address of Deceased:"}
                            {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.StillBirth && "5. Permanent Address of Mother of Stillborn Child:"}
                        </b>
                        {this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration &&
                            <Text> {this.state.addressOfDeceased}</Text>
                        }
                        {
                            this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.StillBirth &&
                            <Text> {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.Street}, {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.City}, {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.State}  {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.PostalCode}</Text>
                        }
                    </Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>6. Cause of Death:</b> {this.props.registerItem.Cause}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>7. Name and Address of Informant:</b></Text>
                    {
                        this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration &&
                        <Text>{this.props.registerItem.InformantsInformation}</Text>
                    }
                    {
                        this.props.registerItem.ContentTypeId === VitalStatsContentTypeIDs.StillBirth &&
                        <Stack>
                            <Text>{this.props.registerItem.MotherName}</Text>
                            <Text> {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.Street}, {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.City}, {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.State}  {JSON.parse(this.props.registerItem.MotherAddress)?.Address?.PostalCode}</Text>
                        </Stack>
                    }
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>8. Name and Address of Doctor:</b></Text>
                    <Text>{this.props.registerItem.DoctorsInformation}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>9. Name and Address of Funeral Director</b></Text>
                    <Text>{this.props.registerItem.FuneralDirectorName}</Text>
                    <Text>{JSON.parse(this.props.registerItem.FuneralHome)?.DisplayName}</Text>
                    <Text>{JSON.parse(this.props.registerItem.FuneralHome)?.Address?.Street}, {JSON.parse(this.props.registerItem.FuneralHome)?.Address?.City}, {JSON.parse(this.props.registerItem.FuneralHome)?.Address?.State}  {JSON.parse(this.props.registerItem.FuneralHome)?.Address?.PostalCode}</Text>
                </Stack>
                <Stack style={borderStackStyle}>
                    <Text><b>10. Date of Registration:</b> {MyDateFormat1(this.props.registerItem.RegistrationDate)}</Text>
                </Stack>
                <Stack style={borderStackStyle} horizontal horizontalAlign='space-between'>
                    <span style={{ alignItems: 'left', display: 'flex', justifyContent: 'left' }}>
                        <Text variant='small' style={{ textAlign: 'left' }}>(Signature of Division Registrar)</Text>
                    </span>
                    <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Text variant='small'>Registration Division <br /><b>1811</b></Text>
                    </span>
                    <span style={{ alignItems: 'right', display: 'flex', justifyContent: 'right' }}>
                        <Text variant='small' style={{ textAlign: 'right' }}>(month by name)(day)(year)<br /><b>{MyDateFormat1(this.props.registerItem.RegistrationDate)}</b></Text>
                    </span>
                </Stack>
                <Stack horizontal>
                    <Text variant='xSmall'>Personal information contained on this form is collected under the authority of the Vital Statistics Act, R.S.O. 1990 c.V.4 and will be used to register and record births, stillbirths, deaths, marriages, additions, or changes of name, corrections or amendments, provide certified copies, extracts, certificates, search notices, photocopies, and for statistical, research, medical, law enforcement, adoption, and adoption disclosure purposes.</Text>
                </Stack>
                <br />
                <Stack horizontal>
                    <Text variant='xSmall'>
                        Questions about this collection should be directed to:
                    </Text>
                </Stack>
                <Stack style={{ paddingLeft: '20px' }}>
                    <Text variant='xSmall'>Deputy Registrar General</Text>
                    <Text variant='xSmall'>P.O. Box 4600, 189 Red River Road</Text>
                    <Text variant='xSmall'>Thunder Bay, Ontario P7B 6L8</Text>
                </Stack>
            </div>
        );
    }
}
