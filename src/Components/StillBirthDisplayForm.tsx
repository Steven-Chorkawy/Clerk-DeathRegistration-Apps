import * as React from 'react';
import { IStillBirthFormProps } from '../extensions/stillBirthForm/components/StillBirthForm';
import { CommandBar, Pivot, PivotItem } from '@fluentui/react';
import Form19 from './Form19';
import Form17 from './Form17';
import PackageSolutionVersion from './PackageSolutionVersion';
import Form3 from './Form3';
import StillBirthrListItemDetails from './StillBirthListItemDetails';

export interface IStillBirthDisplayFormProps extends IStillBirthFormProps {
}

export interface IStillBirthDisplayFormState {
}

export default class StillBirthDisplayForm extends React.Component<IStillBirthDisplayFormProps, IStillBirthDisplayFormState> {
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
                <h2 className='no-print'>Viewing Still Birth Record of '{this.props.context._item.LastName}, {this.props.context._item.FirstName} {this.props.context._item.MiddleName}'</h2>

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
                        headerText="Still Birth"
                        headerButtonProps={{
                            'data-order': 1,
                            'data-title': 'My Files Title',
                        }}
                    >
                        <StillBirthrListItemDetails registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Burial Permit" className='no-print-pivot'>
                        <Form19 registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Acknowledgement of Still Birth" className='no-print-pivot'>
                        <Form3 registerItem={this.props.context._item} />
                    </PivotItem>
                    <PivotItem headerText="Notice of Still Birth" className='no-print-pivot'>
                        <Form17 registerItem={this.props.context._item} />
                    </PivotItem>
                </Pivot>
                <PackageSolutionVersion />
            </div >
        );
    }
}
