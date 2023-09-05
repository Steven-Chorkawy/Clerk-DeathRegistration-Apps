import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { DefaultButton, Depths, Position, PrimaryButton, SpinButton, TextField } from '@fluentui/react';
import { DEATH_REGISTRATION_LIST_TITLE, GetChoiceColumn, GetColumnDefaultValue, GetNextRegistrationNumber, getSP } from '../MyHelperMethods/MyHelperMethods';
import { DeathRegistrationNumberInput, FormSubTitle, MyDatePicker, MyDropdown, MyLocationPicker, MyToggle } from './MyFormComponents';
import IDeathRegisterListItem from '../MyHelperMethods/IDeathRegisterListItem';

export interface IDeathRegisterNewFormProps extends IDeathRegisterFormProps {
}

export interface IDeathRegisterNewFormState {
    sexOptions?: any[]; // DropDown choices.
    informantsRelationshipOptions?: any[] // DropDown choices.
    deathLocationOptions?: any[];
    nextRegistrationNumber?: number;
    defaultFee: number;
}

export default class DeathRegisterNewForm extends React.Component<IDeathRegisterNewFormProps, IDeathRegisterNewFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            nextRegistrationNumber: null,
            defaultFee: 25 // Hard code as 25 but the default value from SharePoint will override this. 
        }



        GetChoiceColumn(DEATH_REGISTRATION_LIST_TITLE, "Sex").then(value => this.setState({ sexOptions: value }));
        GetChoiceColumn(DEATH_REGISTRATION_LIST_TITLE, "Informants Relationship").then(value => this.setState({ informantsRelationshipOptions: value }));
        GetChoiceColumn(DEATH_REGISTRATION_LIST_TITLE, "Death Location").then(value => this.setState({ deathLocationOptions: value }));

        GetColumnDefaultValue('DefaultFee').then(v => this.setState({ defaultFee: Number(v) }));

        GetNextRegistrationNumber().then(value => this.setState({ nextRegistrationNumber: value }));
    }

    private _sp = getSP(this.props.context);

    private _onSave = (input: IDeathRegisterListItem) => {
        // Before we submit this form double check that the Registration Number is still valid. 
        GetNextRegistrationNumber().then((newRegNumber: number) => {
            input.RegistrationNumber = this.state.nextRegistrationNumber;

            if (newRegNumber !== this.state.nextRegistrationNumber && this.state.nextRegistrationNumber !== null) {
                alert(`The Registration Number ${this.state.nextRegistrationNumber} has been taken.  ${newRegNumber} is the next valid number available and will automatically be applied.`);
                input.RegistrationNumber = newRegNumber;
            }
            
            this._sp.web.lists.getByTitle(DEATH_REGISTRATION_LIST_TITLE).items.add({
                ...input
            }).then(value => {
                this.props.onSave();
            }).catch(reason => {
                alert('failed to save...');
                console.error(reason);
            });
        });
    }

    public render(): React.ReactElement<{}> {
        return (
            <div style={{
                marginLeft: '30px', marginRight: '30px', marginTop: '15px', marginBottom: '15px', padding: '15px', boxShadow: Depths.depth8
            }}>
                <h1>New Death Record</h1>
                <hr />
                <Form
                    onSubmit={this._onSave}
                    initialValues={{
                        'WaiveFee': false
                    }}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement>
                            {FormSubTitle("Subject's Information")}
                            <Field
                                id={"Title"}
                                name={"Title"}
                                label={"Title"}
                                required={true}
                                component={TextField}
                            />
                            <Field
                                id={"LastName"}
                                name={"LastName"}
                                label={"Last Name"}
                                component={TextField}
                            />
                            <Field
                                id={"FirstName"}
                                name={"FirstName"}
                                label={"First Name"}
                                component={TextField}
                            />
                            <Field
                                id={"MiddleName"}
                                name={"MiddleName"}
                                label={"Middle Name"}
                                component={TextField}
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
                                label={"Date of Death"}
                                component={MyDatePicker}
                            />
                            <Field
                                id={"Age"}
                                name={"Age"}
                                label={"Age"}
                                component={SpinButton}
                                min={0}
                                step={1}
                                labelPosition={Position.top}
                            />
                            <Field
                                id={'DeathLocation'}
                                name={'DeathLocation'}
                                label={'Death Location'}
                                component={MyDropdown}
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
                                component={DeathRegistrationNumberInput}
                            />
                            {
                                this.state.nextRegistrationNumber &&
                                <div>Next for this year: {this.state.nextRegistrationNumber}</div>
                            }
                            {
                                <a href={`https://claringtonnet.sharepoint.com/sites/Clerk/Lists/DeathRegistration?FilterField1=Year&FilterValue1=${new Date().getFullYear()}&FilterType1=Text&sortField=RegistrationNumber&isAscending=false`} target='_blank'>Click to View {new Date().getFullYear()} Death Registrations</a>
                            }
                            <Field
                                id={"Cause"}
                                name={"Cause"}
                                label={"Cause"}
                                component={TextField}
                                multiline={true}
                                rows={3}
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
                            {FormSubTitle("Informant's Information")}
                            <Field
                                id={"InformantsInformation"}
                                name={"InformantsInformation"}
                                label={"Informant's Information"}
                                component={TextField}
                                multiline={true}
                                rows={3}
                            />
                            <Field
                                id={"InformantsRelationship"}
                                name={"InformantsRelationship"}
                                label={"Informant's Relationship"}
                                component={MyDropdown}
                                options={this.state.informantsRelationshipOptions ? this.state.informantsRelationshipOptions.map(f => { return { key: f, text: f }; }) : []}
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
            </div >
        );
    }
}
