import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IDeathRegisterFormProps';
import { Stack, Text } from '@fluentui/react';
import { MyDateFormat2 } from '../MyHelperMethods/MyHelperMethods';
// import { getSP } from '../MyHelperMethods/MyHelperMethods';

export default class DeathRegisterListItemDetails extends React.Component<IDeathRegisterFormProps, any> {
    constructor(props: any) {
        super(props);
    }
    private MyStack = (label: string, value: string | number | Date): React.ReactElement<{}> => {
        return (
            <Stack horizontal tokens={{ childrenGap: '2.5%' }}>
                <Text variant='large' style={{ width: '20%', textAlign: 'right' }}>{label}:</Text>
                <Text variant='large'>{value}</Text>
            </Stack>
        );
    }
    //private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <h2>Subject's Information</h2>
                <Stack>
                    {this.MyStack('Last Name', this.props.deathRegisterItem.LastName)}
                    {this.MyStack('First Name', this.props.deathRegisterItem.FirstName)}
                    {this.MyStack('Middle Name', this.props.deathRegisterItem.MiddleName)}
                    {this.MyStack('Sex', this.props.deathRegisterItem.Sex)}
                    {this.MyStack('Date of Death', MyDateFormat2(this.props.deathRegisterItem.DateOfDeath))}
                    {this.MyStack('Age', this.props.deathRegisterItem.Age)}
                    {this.MyStack('Death Location', this.props.deathRegisterItem.DeathLocation)}
                    {this.MyStack('Registration Date', MyDateFormat2(this.props.deathRegisterItem.RegistrationDate))}
                    {this.MyStack('Registration Number', this.props.deathRegisterItem.RegistrationNumber)}
                    {this.MyStack('Cause', this.props.deathRegisterItem.Cause)}
                </Stack>

                <h2>Doctor's Information</h2>
                <Stack>
                    {this.MyStack('Doctors Information', this.props.deathRegisterItem.DoctorsInformation)}
                </Stack>
                <h2>Informant's Information</h2>
                <Stack>
                    {this.MyStack('Informants Information', this.props.deathRegisterItem.InformantsInformation)}
                    {this.MyStack('Informants Relationship', this.props.deathRegisterItem.InformantsRelationship)}
                </Stack>
                <h2>Funeral Home Information</h2>
                <Stack>
                    {this.MyStack('Director Name', this.props.deathRegisterItem.FuneralDirectorName)}
                    {this.MyStack('Home Name', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.DisplayName)}
                    {this.MyStack('Street Address', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address?.Street)}
                    {this.MyStack('City', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address?.City)}
                    {this.MyStack('Province', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address?.State)}
                    {this.MyStack('Postal', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address?.PostalCode)}
                    {this.MyStack('Country', JSON.parse(this.props.deathRegisterItem.FuneralHome)?.Address?.CountryOrRegion)}
                </Stack>
            </div>
        );
    }
}
