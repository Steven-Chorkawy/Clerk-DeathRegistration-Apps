import { ActionButton, Dropdown, IDropdownOption, Stack } from '@fluentui/react';
import * as React from 'react';
import { VitalStatsContentTypeIDs } from '../../../MyHelperMethods/VitalStatsContentTypes';
import { GetRegistrationReportByMonth, GroupBy, MY_MONTHS } from '../../../MyHelperMethods/MyHelperMethods';

export interface IMonthlyDeathReportsState {
  selectedYear: number;
  selectedReport: VitalStatsContentTypeIDs;
  itemsFound?: any;
  itemsFoundGroupedByMonth?: any;
}

export default class MonthlyDeathReports extends React.Component<any, IMonthlyDeathReportsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      selectedReport: VitalStatsContentTypeIDs.DeathRegistration
    };

    this._runReport();
  }

  private _runReport = (): void => {
    GetRegistrationReportByMonth(this.state.selectedYear, this.state.selectedReport).then((value: any) => {
      this.setState({
        itemsFound: value,
        itemsFoundGroupedByMonth: GroupBy(value, (v: any) => v.RegistrationDateMonth)
      });
    });
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <h1>Deaths by Month for {this.state.selectedYear}</h1>
        <Stack horizontal tokens={{ childrenGap: 'l1', padding: 'l1' }}>
          <Stack.Item grow={3}>
            <ActionButton onClick={() => this.setState({ selectedYear: this.state.selectedYear - 1 }, () => this._runReport())}>Previous Year</ActionButton>
          </Stack.Item>
          <Stack.Item grow={3}>
            <ActionButton onClick={() => this.setState({ selectedYear: this.state.selectedYear + 1 }, () => this._runReport())}>Next Year</ActionButton>
          </Stack.Item>
          <Stack.Item grow={3}>
            <Dropdown
              placeholder="Select a Report"
              label="Select Report"
              id='selectedReport'
              defaultSelectedKey={VitalStatsContentTypeIDs.DeathRegistration}
              options={[{ key: VitalStatsContentTypeIDs.DeathRegistration, text: 'Death Report' }, { key: VitalStatsContentTypeIDs.StillBirth, text: 'Still Birth Report' }]}
              onChange={(event, option: IDropdownOption) => {
                this.setState({ selectedReport: option.key as VitalStatsContentTypeIDs }, () => this._runReport());
              }}
            />
          </Stack.Item>
        </Stack>
        <div>
          {
            this.state?.itemsFound &&
            <table>
              <tr>
                <th>Month</th>
                <th>Total</th>
                {this.state.selectedReport === VitalStatsContentTypeIDs.DeathRegistration && <th>Invoiced</th>}
              </tr>
              {
                MY_MONTHS.map((month: string) => {
                  return <tr>
                    <td>{month.slice(3)}</td>
                    <td>{this.state.itemsFoundGroupedByMonth[month] ? this.state.itemsFoundGroupedByMonth[month].length : 0}</td>
                    {
                      this.state.selectedReport === VitalStatsContentTypeIDs.DeathRegistration &&
                      <td>{this.state.itemsFoundGroupedByMonth[month] ? this.state.itemsFoundGroupedByMonth[month].filter((obj: any) => obj.WaiveFee === false).length : 0}</td>
                    }
                  </tr>;
                })
              }
            </table>
          }
        </div>
      </div>
    );
  }
}
