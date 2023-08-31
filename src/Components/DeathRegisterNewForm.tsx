import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import { DEATH_REGISTRATION_CONTENT_TYPE_ID, DEATH_REGISTRATION_LIST_ID } from '../MyHelperMethods/MyHelperMethods';
import { IDynamicFieldProps } from '@pnp/spfx-controls-react/lib/controls/dynamicForm/dynamicField';
import { ActionButton, DefaultEffects } from '@fluentui/react';

export interface IDeathRegisterNewFormProps extends IDeathRegisterFormProps {
}

export interface IDeathRegisterNewFormState {
    generateRegistrationNumber: boolean;
}

export default class DeathRegisterNewForm extends React.Component<IDeathRegisterNewFormProps, IDeathRegisterNewFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            generateRegistrationNumber: true
        }
    }

    // ! Dynamic Form is not submitting.  I cannot insert custom components between fields. Not a fan...
    public render(): React.ReactElement<{}> {
        return (
            <div style={{ margin: '10px', padding: '10px' }}>
                <DynamicForm
                    context={this.props.context as any}
                    listId={DEATH_REGISTRATION_LIST_ID}
                    contentTypeId={DEATH_REGISTRATION_CONTENT_TYPE_ID}
                    //listItemId={1}
                    onCancelled={() => { console.log('Cancelled') }}
                    onBeforeSubmit={async (listItem) => {
                        console.log('before submit');
                        console.log(listItem);
                        return true;
                    }}
                    onSubmitError={(listItem, error) => { alert(error.message); }}
                    onSubmitted={(listItemData, listItem) => {
                        console.log(listItemData);
                        console.log(listItem);
                    }}
                    hiddenFields={['Year']}
                    fieldOverrides={{
                        "RegistrationNumber": (fieldProperties: IDynamicFieldProps) =>
                            <div style={{ boxShadow: DefaultEffects.elevation8 }}>
                                <ActionButton iconProps={{ iconName: 'NumberSymbol' }} onClick={() => { alert('TODO, get a number.'); }}>
                                    Create Next Registration Number
                                </ActionButton>
                            </div>,
                    }}
                />
            </div >
        );
    }
}
