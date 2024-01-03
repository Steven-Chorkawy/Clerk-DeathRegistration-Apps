import * as React from 'react';
import IDeathRegisterFormProps from '../MyHelperMethods/IRegisterFormProps';
import { Stack, Text } from '@fluentui/react';
import { FormatDeathLocation, MyDateFormat2 } from '../MyHelperMethods/MyHelperMethods';
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
                    {this.MyStack('Last Name', this.props.registerItem.LastName)}
                    {this.MyStack('First Name', this.props.registerItem.FirstName)}
                    {this.MyStack('Middle Name', this.props.registerItem.MiddleName)}
                    {this.MyStack('Sex', this.props.registerItem.Sex)}
                    {this.MyStack('Date of Death', MyDateFormat2(this.props.registerItem.DateOfDeath))}
                    {this.MyStack('Age', this.props.registerItem.Age)}
                    {this.MyStack('Death Location', FormatDeathLocation(this.props.registerItem))}
                    {this.MyStack('Registration Date', MyDateFormat2(this.props.registerItem.RegistrationDate))}
                    {this.MyStack('Registration Number', this.props.registerItem.RegistrationNumber)}
                    {this.MyStack('Cause', this.props.registerItem.Cause)}
                </Stack>

                <h2>Doctor's Information</h2>
                <Stack>
                    {this.MyStack('Doctors Information', this.props.registerItem.DoctorsInformation)}
                </Stack>
                <h2>Informant's Information</h2>
                <Stack>
                    {this.MyStack('Informants Information', this.props.registerItem.InformantsInformation)}
                    {this.MyStack('Informants Relationship', this.props.registerItem.InformantsRelationship)}
                </Stack>
                <h2>Funeral Home Information</h2>
                <Stack>
                    {this.MyStack('Director Name', this.props.registerItem.FuneralDirectorName)}
                    {this.MyStack('Home Name', JSON.parse(this.props.registerItem.FuneralHome)?.DisplayName)}
                    {this.MyStack('Street Address', JSON.parse(this.props.registerItem.FuneralHome)?.Address?.Street)}
                    {this.MyStack('City', JSON.parse(this.props.registerItem.FuneralHome)?.Address?.City)}
                    {this.MyStack('Province', JSON.parse(this.props.registerItem.FuneralHome)?.Address?.State)}
                    {this.MyStack('Postal', JSON.parse(this.props.registerItem.FuneralHome)?.Address?.PostalCode)}
                    {this.MyStack('Country', JSON.parse(this.props.registerItem.FuneralHome)?.Address?.CountryOrRegion)}
                </Stack>
            </div>
        );
    }
}
