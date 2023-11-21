import * as React from 'react';
import { IDeathRegisterFormProps } from '../extensions/deathRegisterForm/components/DeathRegisterForm';
import { CommandBar, Pivot, PivotItem } from '@fluentui/react';
import Form19 from './Form19';
import Form18 from './Form18';
import Form17 from './Form17';
import DeathRegisterListItemDetails from './DeathRegisterListItemDetails';
import PackageSolutionVersion from './PackageSolutionVersion';

export interface IDeathRegisterDisplayFormProps extends IDeathRegisterFormProps {
}

export interface IDeathRegisterDisplayFormState {

}

export default class DeathRegisterDisplayForm extends React.Component<IDeathRegisterDisplayFormProps, IDeathRegisterDisplayFormState> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        return (
            <div style={{
                marginLeft: '30px',
                marginRight: '30px',
                marginTop: '15px',
                marginBottom: '15px',
                padding: '15px'
            }}>
                <h2 className='no-print'>Viewing Death Record of '{this.props.context._item.LastName}, {this.props.context._item.FirstName} {this.props.context._item.MiddleName}'</h2>

                <CommandBar
                    className='no-print'
                    items={[
                        {
                            key: 'print',
                            text: 'Print',
                            iconProps: { iconName: 'Print' },
                            onClick: (e, item) => window.print()
                        }
                    ]}
                />

                <Pivot aria-label="Basic Pivot Example" className='no-print-pivot'>
                    <PivotItem
                        headerText="Death Registration"
                        headerButtonProps={{
                            'data-order': 1,
                            'data-title': 'My Files Title',
                        }}
                    >
                        <DeathRegisterListItemDetails registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Burial Permit" className='no-print-pivot'>
                        <Form19 registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Acknowledgement of Death" className='no-print-pivot'>
                        <Form18 registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Notice of Registration of Death" className='no-print-pivot'>
                        <Form17 registerItem={this.props.context._item} />
                    </PivotItem>
                </Pivot>
                <PackageSolutionVersion />
            </div >
        );
    }
}
