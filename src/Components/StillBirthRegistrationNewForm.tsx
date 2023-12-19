import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { DefaultButton, Depths, PrimaryButton, TextField } from '@fluentui/react';
import { DEATH_REGISTRATION_LIST_TITLE, FormatTitle, GetChoiceColumn, GetColumnDefaultValue, GetNextRegistrationNumber, getSP } from '../MyHelperMethods/MyHelperMethods';
import { DeathRegistrationNumberInput, FormSubTitle, MyComboBox, MyDatePicker, MyDropdown, MyLocationPicker, MyTextField, MyToggle } from './MyFormComponents';

import PackageSolutionVersion from './PackageSolutionVersion';
import { VitalStatsContentTypeIDs } from '../MyHelperMethods/VitalStatsContentTypes';
import IStillAndDeathRegisterListItem from '../MyHelperMethods/IStillAndDeathRegisterListItem';

export interface IStillBirthRegistrationNewFormProps extends IDeathRegisterFormProps {
}

export interface IStillBirthRegistrationNewFormState {
    sexOptions?: any[]; // DropDown choices.
    deathLocationOptions?: any[];
    nextRegistrationNumber?: number;
    defaultFee: number;
}

export default class StillBirthRegistrationNewForm extends React.Component<IStillBirthRegistrationNewFormProps, IStillBirthRegistrationNewFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            nextRegistrationNumber: null,
            defaultFee: 25 // Hard code as 25 but the default value from SharePoint will override this. 
        }

        GetChoiceColumn(DEATH_REGISTRATION_LIST_TITLE, "Sex").then(value => this.setState({ sexOptions: value })).catch(reason => alert('Failed to get Sex options.'));
        GetChoiceColumn(DEATH_REGISTRATION_LIST_TITLE, "Death Location").then(value => this.setState({ deathLocationOptions: value })).catch(reason => alert('Failed to get Death Location options.'));

        GetColumnDefaultValue('DefaultFee').then(v => this.setState({ defaultFee: Number(v) })).catch(reason => alert('Failed to get Fees default value.'));

        GetNextRegistrationNumber(VitalStatsContentTypeIDs.StillBirth).then(value => this.setState({ nextRegistrationNumber: value })).catch(reason => alert('Failed to get next registration number'));
    }

    private _sp = getSP(this.props.context);

    private _onSave = (input: IStillAndDeathRegisterListItem): void => {
        // Before we submit this form double check that the Registration Number is still valid. 
        GetNextRegistrationNumber(VitalStatsContentTypeIDs.StillBirth).then((newRegNumber: number) => {
            // Set the current registration number.  This will be double checked later.
            input.RegistrationNumber = this.state.nextRegistrationNumber;

            // Format the list items title.  Last, First Middle.  Trim any white spaces for title.
            input.Title = FormatTitle(input);

            // Double check that the forms registration number is still valid.
            if (newRegNumber !== this.state.nextRegistrationNumber && this.state.nextRegistrationNumber !== null) {
                alert(`The Registration Number ${this.state.nextRegistrationNumber} has been taken.  ${newRegNumber} is the next valid number available and will automatically be applied.`);
                input.RegistrationNumber = newRegNumber;
            }

            this._sp.web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).items
                .add({
                    ...input,
                    ContentTypeId: VitalStatsContentTypeIDs.StillBirth
                })
                .then(value => {
                    this.props.onSave();
                })
                .catch(reason => {
                    alert('failed to save...');
                    console.error(reason);
                });
        }).catch(reason => alert('Failed to get next registration number.'));
    }

    public render(): React.ReactElement<{}> {
        return (
            <div style={{
                marginLeft: '30px', marginRight: '30px', marginTop: '15px', marginBottom: '15px', padding: '15px', boxShadow: Depths.depth8
            }}>
                <h1>New Record of Still Birth</h1>
                <hr />
                <Form
                    onSubmit={this._onSave}
                    initialValues={{
                        'WaiveFee': false,
                        'RegistrationDate': new Date(),
                        'DateOfDeath': new Date()
                    }}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement>
                            {FormSubTitle("Child's Information")}
                            <Field
                                id={"LastName"}
                                name={"LastName"}
                                label={"Last Name"}
                                required={true}
                                component={MyTextField}
                            />
                            <Field
                                id={"FirstName"}
                                name={"FirstName"}
                                label={"First Name"}
                                required={true}
                                component={MyTextField}
                            />
                            <Field
                                id={"MiddleName"}
                                name={"MiddleName"}
                                label={"Middle Name"}
                                component={MyTextField}
                            />
                            <Field
                                id={"Sex"}
                                name={"Sex"}
                                label={"Sex"}
                                component={MyDropdown}
                                options={this.state.sexOptions ? this.state.sexOptions.map(f => { return { key: f, text: f }; }) : []}
                            />
                            <Field
                                id={"DateOfDeath"}
                                name={"DateOfDeath"}
                                label={"Date of Birth"}
                                component={MyDatePicker}
                            />
                            <Field
                                id={'DeathLocation'}
                                name={'DeathLocation'}
                                label={'Birth Location'}
                                component={MyComboBox}
                                allowFreeInput={true}
                                options={this.state.deathLocationOptions ? this.state.deathLocationOptions.map(f => { return { key: f, text: f }; }) : []}
                            />
                            <Field
                                id={"RegistrationDate"}
                                name={"RegistrationDate"}
                                label={"Registration Date"}
                                component={MyDatePicker}
                            />
                            <Field
                                id={"RegistrationNumber"}
                                name={"RegistrationNumber"}
                                label={"Registration Number"}
                                onChange={(e) => {
                                    this.setState({ nextRegistrationNumber: e.value });
                                }}
                                contentTypeId={VitalStatsContentTypeIDs.StillBirth}
                                component={DeathRegistrationNumberInput}
                            />
                            {
                                this.state.nextRegistrationNumber &&
                                <div>Next for this year: {this.state.nextRegistrationNumber}</div>
                            }
                            {
                                <a href={`https://claringtonnet.sharepoint.com/sites/Clerk/Lists/DeathRegistration?FilterField1=Year&FilterValue1=${new Date().getFullYear()}&FilterType1=Text&sortField=RegistrationNumber&isAscending=false`} target='_blank' rel="noreferrer">
                                    Click to View {new Date().getFullYear()} Still Birth Registrations
                                </a>
                            }
                            <Field
                                id={"Cause"}
                                name={"Cause"}
                                label={"Cause"}
                                component={TextField}
                                multiline={true}
                                rows={3}
                            />
                            {FormSubTitle("Mother's Information")}
                            <Field
                                id={"MotherName"}
                                name={"MotherName"}
                                label={"Mother's Name"}
                                component={MyTextField}
                            />
                            <Field
                                id={"MotherAddress"}
                                name={"MotherAddress"}
                                label={"Mother's Address"}
                                component={MyLocationPicker}
                                context={this.props.context}
                            />
                            {FormSubTitle("Doctor's Information")}
                            <Field
                                id={"DoctorsInformation"}
                                name={"DoctorsInformation"}
                                label={"Doctor's Information"}
                                component={TextField}
                                multiline={true}
                                rows={3}
                            />
                            {FormSubTitle("Funeral Home Information")}
                            <Field
                                id={"FuneralHome"}
                                name={"FuneralHome"}
                                label={"Funeral Home"}
                                component={MyLocationPicker}
                                context={this.props.context}
                            />
                            <Field
                                id={'FuneralDirectorName'}
                                name={'FuneralDirectorName'}
                                label={'Funeral Director Name'}
                                component={TextField}
                            />
                            <Field
                                id={'WaiveFee'}
                                name={'WaiveFee'}
                                label={'Waive Fee?'}
                                component={MyToggle}
                                onText="Yes"
                                offText="No"
                            />
                            <div>
                                {
                                    !formRenderProps.valueGetter('WaiveFee')
                                        ? <div>Fee: {(this.state.defaultFee).toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</div>
                                        : <div>Fee: $0.00</div>
                                }
                            </div>

                            {FormSubTitle("Burial Permit Information (if not issued by Clarington)")}
                            <Field
                                id={"BurialPermitInformation"}
                                name={"BurialPermitInformation"}
                                label={"Burial Permit Information"}
                                component={TextField}
                                multiline={true}
                                rows={3}
                            />

                            <div className={'k-form-button'} style={{ marginTop: '45px', marginBottom: '20px' }}>
                                <PrimaryButton
                                    text="Save"
                                    type='submit'
                                    style={{ marginLeft: '10px', marginRight: '10px' }}
                                />
                                <DefaultButton
                                    text="Clear"
                                    style={{ marginLeft: '10px', marginRight: '10px' }}
                                    onClick={e => {
                                        if (confirm("Are you sure you want to clear this form? Any unsaved information will be lost.")) {
                                            formRenderProps.onFormReset();
                                        }
                                    }}
                                />
                                <DefaultButton
                                    text="Close"
                                    style={{ marginLeft: '10px', marginRight: '10px' }}
                                    onClick={e => {
                                        if (confirm("Are you sure you want to close this form? Any unsaved information will be lost.")) {
                                            this.props.onClose();
                                        }
                                    }}
                                />
                            </div>
                        </FormElement>
                    )}
                />
                <PackageSolutionVersion />
            </div >
        );
    }
}
