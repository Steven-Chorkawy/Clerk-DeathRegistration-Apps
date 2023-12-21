import { Dropdown, IDropdownOption, Position, PrimaryButton, SpinButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { VitalStatsContentTypeIDs } from '../../../MyHelperMethods/VitalStatsContentTypes';
import { GetRegistrationReport, GroupBy, MY_MONTHS } from '../../../MyHelperMethods/MyHelperMethods';
import PackageSolutionVersion from '../../../Components/PackageSolutionVersion';
import FuneralHomeInvoiceTable from '../../../Components/FuneralHomeInvoiceTable';

export interface IFuneralHomeInvoiceReportState {
  selectedYear: number;
  selectedMonth: string;
  selectedReport?: VitalStatsContentTypeIDs;
  itemsFoundGroupedByFuneralHome?: any;
}

export default class FuneralHomeInvoiceReport extends React.Component<any, IFuneralHomeInvoiceReportState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      selectedMonth: `${new Date().getMonth() + 1}-${new Date().toLocaleString('default', { month: 'long' })}`,
    }
  }

  private _runReport = async (): Promise<void> => {
    // These dates are formatted so they will get the first and last day of the selected month.
    const FIRST_DAY_OF_MONTH = new Date(this.state.selectedYear, Number(this.state.selectedMonth.toString().substring(0, 2)) - 1, 1);
    const LAST_DAY_OF_MONTH = new Date(this.state.selectedYear, Number(this.state.selectedMonth.toString().substring(0, 2)), 0);

    let itemsFound = await GetRegistrationReport(FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH, this.state.selectedReport)
    console.log(itemsFound);
    // DispName is the name of the Funeral Home.
    let itemsFoundGroupedByFuneralHome = GroupBy(itemsFound, (v: any) => v.DispName);
    console.log(itemsFoundGroupedByFuneralHome);
    this.setState({ itemsFoundGroupedByFuneralHome: itemsFoundGroupedByFuneralHome });
  }

  public render(): React.ReactElement<any> {
    return (
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <h1 style={{ marginBottom: '0' }}>{this.state.selectedReport === VitalStatsContentTypeIDs.DeathRegistration ? "Death" : "Still Birth"} Registration Report</h1>
        <Stack horizontal tokens={{ childrenGap: 'l1', padding: 'l1' }}>
          <Stack.Item grow={3}>
            <SpinButton
              label="Select Year"
              labelPosition={Position.top}
              defaultValue={this.state.selectedYear.toString()}
              step={1}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              onChange={(event, newValue) => {
                this.setState({ selectedYear: Number(newValue), itemsFoundGroupedByFuneralHome: [] });
              }}
            />
          </Stack.Item>
          <Stack.Item grow={3}>
            <Dropdown
              placeholder="Select Month"
              label="Select Month"
              id='selectMonth'
              defaultSelectedKey={this.state.selectedMonth}
              selectedKey={this.state.selectedMonth}
              options={MY_MONTHS.map(m => { return { key: m, text: m }; })}
              onChange={(event, option: IDropdownOption) => {
                this.setState({ selectedMonth: option.text, itemsFoundGroupedByFuneralHome: [] });
              }}
            />
          </Stack.Item>
          <Stack.Item grow={3}>
            <Dropdown
              placeholder="Select Report"
              label="Select Report"
              id='selectedReport'
              selectedKey={this.state?.selectedReport}
              options={[{ key: VitalStatsContentTypeIDs.DeathRegistration, text: 'Death Report' }, { key: VitalStatsContentTypeIDs.StillBirth, text: 'Still Birth Report' }]}
              onChange={(event, option: IDropdownOption) => {
                this.setState({ selectedReport: option.key as VitalStatsContentTypeIDs, itemsFoundGroupedByFuneralHome: [] });
              }}
            />
          </Stack.Item>
        </Stack>
        <PrimaryButton
          text='Click to View Report'
          style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}
          onClick={() => this._runReport()}
        />
        <hr />
        {
          this.state?.itemsFoundGroupedByFuneralHome &&
          <div>
            {
              Object.keys(this.state.itemsFoundGroupedByFuneralHome)
                .map((value: string, index: number) => {
                  return <FuneralHomeInvoiceTable
                    FuneralHomeName={value}
                    ListItems={this.state.itemsFoundGroupedByFuneralHome[value]}
                    ContentTypeId={this.state.selectedReport}
                  />;
                })
            }
          </div>
        }
        <hr />
        <PackageSolutionVersion />
      </div>
    );
  }
}
