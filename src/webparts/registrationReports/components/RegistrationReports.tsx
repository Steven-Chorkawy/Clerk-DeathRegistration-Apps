import { DatePicker, Dropdown, IDropdownOption, Stack } from '@fluentui/react';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';
import PackageSolutionVersion from '../../../Components/PackageSolutionVersion';
import { GetRegistrationReport, getSP } from '../../../MyHelperMethods/MyHelperMethods';
import { VitalStatsContentTypeIDs } from '../../../MyHelperMethods/VitalStatsContentTypes';
import IStillAndDeathRegisterListItem from '../../../MyHelperMethods/IStillAndDeathRegisterListItem';

export interface IRegistrationReportsState {
  fromDate?: Date;
  toDate?: Date;
  selectedReport?: VitalStatsContentTypeIDs;
  itemsFound: IStillAndDeathRegisterListItem[];
}

export default class RegistrationReports extends React.Component<any, IRegistrationReportsState> {
  constructor(props: any) {
    super(props);
    getSP(this.props.context);
    this.state = { itemsFound: [] }
  }

  private _EnableReportButton(): boolean {
    return (this.state?.fromDate && this.state?.toDate && this.state?.selectedReport) ? false : true;
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <h1>Registration Reports</h1>
        <div>
          <Stack horizontal tokens={{ childrenGap: 'l1', padding: 'l1' }}>
            <Stack.Item grow={3}>
              <DatePicker
                placeholder="Select a From Registration Date..."
                ariaLabel="Select a From Registration Date"
                label='From Registration Date'
                id='fromDate'
                // value={new Date()}
                onSelectDate={(date: Date) => { this.setState({ fromDate: date }); }}
              />
            </Stack.Item>
            <Stack.Item grow={3}>
              <DatePicker
                placeholder="Select a To Registration Date..."
                ariaLabel="Select a To Registration Date"
                label='To Registration Date'
                id='toDate'
                // value={new Date()}
                onSelectDate={(date: Date) => { this.setState({ toDate: date }); }}
              />
            </Stack.Item>
            <Stack.Item grow={3}>
              <Dropdown
                placeholder="Select a Report"
                label="Select Report"
                id='selectedReport'
                options={[{ key: VitalStatsContentTypeIDs.DeathRegistration, text: 'Death Report' }, { key: VitalStatsContentTypeIDs.StillBirth, text: 'Still Birth Report' }]}
                onChange={(event, option: IDropdownOption) => { this.setState({ selectedReport: option.key as VitalStatsContentTypeIDs }); }}
              />
            </Stack.Item>
          </Stack>
          <PrimaryButton
            text='Click to View Report'
            style={{ width: '100%' }}
            disabled={this._EnableReportButton()}
            onClick={() => {
              GetRegistrationReport(this.state.fromDate, this.state.toDate, this.state.selectedReport)
                .then(value => {
                  this.setState({ itemsFound: value });
                })
                .catch((reason: any) => {
                  console.log('Reason:');
                  console.error(reason);
                  console.log(reason);
                  this.setState({ itemsFound: null });
                });
            }}
          />
        </div>
        <div>
          {/* <DetailsList
            items={items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          /> */}
        </div>
        <div>
          {
            this.state?.itemsFound && this.state.itemsFound
              .forEach((value: IStillAndDeathRegisterListItem) => {
                return <div>{JSON.stringify(value)}<hr /></div>;
              })
          }
        </div>
        <hr />
        <PackageSolutionVersion />
      </div >
    );
  }
}
