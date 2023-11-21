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
    //private _sp = getSP(this.props.context);

    public render(): React.ReactElement<{}> {
        return (
            <div>
                <h2>Subject's Information</h2>
                <Stack>
                    {this.MyStack('Last Name', this.props.stillBirthItem.LastName)}
                    {this.MyStack('First Name', this.props.stillBirthItem.FirstName)}
                    {this.MyStack('Middle Name', this.props.stillBirthItem.MiddleName)}
                    {this.MyStack('Sex', this.props.stillBirthItem.Sex)}
                    {this.MyStack('Date of Death', MyDateFormat2(this.props.stillBirthItem.DateOfDeath))}
                    {this.MyStack('Death Location', this.props.stillBirthItem.DeathLocation)}
                    {this.MyStack('Registration Date', MyDateFormat2(this.props.stillBirthItem.RegistrationDate))}
                    {this.MyStack('Registration Number', this.props.stillBirthItem.RegistrationNumber)}
                    {this.MyStack('Cause', this.props.stillBirthItem.Cause)}
                </Stack>
                <h2>Mother's Information</h2>
                <Stack>
                    {this.MyStack('Mothers Information', this.props.stillBirthItem.MotherInformation)}
                </Stack>
                <h2>Doctor's Information</h2>
                <Stack>
                    {this.MyStack('Doctors Information', this.props.stillBirthItem.DoctorsInformation)}
                </Stack>           
                <h2>Funeral Home Information</h2>
                <Stack>
                    {this.MyStack('Director Name', this.props.stillBirthItem.FuneralDirectorName)}
                    {this.MyStack('Home Name', JSON.parse(this.props.stillBirthItem.FuneralHome)?.DisplayName)}
                    {this.MyStack('Street Address', JSON.parse(this.props.stillBirthItem.FuneralHome)?.Address?.Street)}
                    {this.MyStack('City', JSON.parse(this.props.stillBirthItem.FuneralHome)?.Address?.City)}
                    {this.MyStack('Province', JSON.parse(this.props.stillBirthItem.FuneralHome)?.Address?.State)}
                    {this.MyStack('Postal', JSON.parse(this.props.stillBirthItem.FuneralHome)?.Address?.PostalCode)}
                    {this.MyStack('Country', JSON.parse(this.props.stillBirthItem.FuneralHome)?.Address?.CountryOrRegion)}
                </Stack>
            </div>
        );
    }
}
