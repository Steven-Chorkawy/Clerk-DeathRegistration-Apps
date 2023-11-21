import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { MyDateFormat2 } from '../MyHelperMethods/MyHelperMethods';
import IStillBirthFormProps from '../MyHelperMethods/IStillBirthFormProps';

export default class StillBirthrListItemDetails extends React.Component<IStillBirthFormProps, any> {
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

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <h2>Child's Information</h2>
                <Stack>
                    {this.MyStack('Last Name', this.props.registerItem.LastName)}
                    {this.MyStack('First Name', this.props.registerItem.FirstName)}
                    {this.MyStack('Middle Name', this.props.registerItem.MiddleName)}
                    {this.MyStack('Sex', this.props.registerItem.Sex)}
                    {this.MyStack('Date of Birth', MyDateFormat2(this.props.registerItem.DateOfDeath))}
                    {this.MyStack('Death Location', this.props.registerItem.DeathLocation)}
                    {this.MyStack('Registration Date', MyDateFormat2(this.props.registerItem.RegistrationDate))}
                    {this.MyStack('Registration Number', this.props.registerItem.RegistrationNumber)}
                    {this.MyStack('Cause', this.props.registerItem.Cause)}
                </Stack>
                <h2>Mother's Information</h2>
                <Stack>
                    {this.MyStack('Mothers Information', this.props.registerItem.MotherInformation)}
                    {this.MyStack('Street Address', JSON.parse(this.props.registerItem.MotherAddress)?.Address?.Street)}
                    {this.MyStack('City', JSON.parse(this.props.registerItem.MotherAddress)?.Address?.City)}
                    {this.MyStack('Province', JSON.parse(this.props.registerItem.MotherAddress)?.Address?.State)}
                    {this.MyStack('Postal', JSON.parse(this.props.registerItem.MotherAddress)?.Address?.PostalCode)}
                    {this.MyStack('Country', JSON.parse(this.props.registerItem.MotherAddress)?.Address?.CountryOrRegion)}
                </Stack>
                <h2>Doctor's Information</h2>
                <Stack>
                    {this.MyStack('Doctors Information', this.props.registerItem.DoctorsInformation)}
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
                <h2>Burial Permit Information (if not issued by Clarington)</h2>
                <Stack>
                    {this.MyStack('Burial Permit Information', this.props.registerItem.BurialPermitInformation)}
                </Stack> 
            </div>
        );
    }
}
