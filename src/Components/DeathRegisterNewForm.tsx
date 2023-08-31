import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import { IDynamicFieldProps } from '@pnp/spfx-controls-react/lib/controls/dynamicForm/dynamicField';
import { ActionButton } from '@fluentui/react';
import { DefaultEffects } from '@fluentui/react';
import { DEATH_REGISTRATION_CONTENT_TYPE_ID, DEATH_REGISTRATION_LIST_ID } from '../MyHelperMethods/MyHelperMethods';

export interface IDeathRegisterNewFormProps extends IDeathRegisterFormProps {
}

export default class DeathRegisterNewForm extends React.Component<IDeathRegisterNewFormProps, {}> {
    constructor(props: any) {
        super(props);
    }

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
                    onSubmitted={async (listItemData) => { console.log(listItemData); }}
                    returnListItemInstanceOnSubmit={true}
                    hiddenFields={['Year']}
                    fieldOverrides={{
                        "RegistrationNumber": (fieldProperties: IDynamicFieldProps) =>
                            <div style={{ boxShadow: DefaultEffects.elevation8 }}>
                                <ActionButton iconProps={{ iconName: 'NumberSymbol' }} onClick={() => { alert('TODO, get a number.'); }}>
                                    Create Next Registration Number
                                </ActionButton>
                            </div>,
                    }}
                >
                </DynamicForm>
            </div>
        );
    }
}
