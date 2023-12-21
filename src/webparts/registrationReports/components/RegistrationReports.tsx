import { DatePicker, DetailsList, Dropdown, IColumn, IDropdownOption, PrimaryButton, SelectionMode, Stack } from '@fluentui/react';
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
    const DETAIL_LIST_DEATH_REG_COLUMNS: IColumn[] = [
      {
        key: 'column1',
        name: 'Deceased',
        fieldName: 'Title',
        minWidth: 30,
        maxWidth: 100,
        isResizable: true,
      },
      {
        key: 'column2',
        name: 'Death Date',
        fieldName: 'DateOfDeath',
        minWidth: 30,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
      },
      {
        key: 'column3',
        name: 'Age',
        fieldName: 'Age',
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
      },
      {
        key: 'column4',
        name: 'Reg Date',
        fieldName: 'RegistrationDate',
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
      },
      {
        key: 'column5',
        name: 'Reg Num',
        fieldName: 'RegistrationNumber',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column6',
        name: 'Sex',
        fieldName: 'Sex',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column7',
        name: 'Location',
        fieldName: 'DeathLocation',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column8',
        name: 'Cause of Death',
        fieldName: 'Cause',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column9',
        name: "Doctor",
        fieldName: "DoctorsInformation",
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column10',
        name: "Informant",
        fieldName: "InformantsInformation",
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column11',
        name: "Funeral Home",
        fieldName: "FuneralHome",
        minWidth: 30,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => {
          return <div>
            <div>
              <span>{JSON.parse(item.FuneralHome)?.DisplayName}</span>
            </div>
            <span>{JSON.parse(item.FuneralHome)?.Address?.Street}, {JSON.parse(item.FuneralHome)?.Address?.City}, {JSON.parse(item.FuneralHome)?.Address?.State} {JSON.parse(item.FuneralHome)?.Address?.PostalCode}</span>
          </div>;
        }
      }
    ];

    const DETAIL_LIST_STILL_BIRTH_COLUMNS: IColumn[] = [
      {
        key: 'column1',
        name: 'Child',
        fieldName: 'Title',
        minWidth: 30,
        maxWidth: 100,
        isResizable: true,
      },
      {
        key: 'column2',
        name: 'Still Birth Date',
        fieldName: 'DateOfDeath',
        minWidth: 30,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
      },
      {
        key: 'column3',
        name: 'Reg Date',
        fieldName: 'RegistrationDate',
        minWidth: 30,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
      },
      {
        key: 'column4',
        name: 'Reg Num',
        fieldName: 'RegistrationNumber',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column5',
        name: 'Sex',
        fieldName: 'Sex',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column6',
        name: 'Location',
        fieldName: 'DeathLocation',
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column8',
        name: "Doctor",
        fieldName: "DoctorsInformation",
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column9',
        name: "Informant",
        fieldName: "InformantsInformation",
        minWidth: 30,
        isResizable: true,
      },
      {
        key: 'column10',
        name: "Funeral Home",
        fieldName: "FuneralHome",
        minWidth: 30,
        isResizable: true,
        onRender: (item: IStillAndDeathRegisterListItem) => {
          return <div>
            <div>
              <span>{JSON.parse(item.FuneralHome)?.DisplayName}</span>
            </div>
            <span>{JSON.parse(item.FuneralHome)?.Address?.Street}, {JSON.parse(item.FuneralHome)?.Address?.City}, {JSON.parse(item.FuneralHome)?.Address?.State} {JSON.parse(item.FuneralHome)?.Address?.PostalCode}</span>
          </div>;
        }
      }
    ];

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
                onSelectDate={(date: Date) => { this.setState({ fromDate: date, itemsFound: [] }); }}
              />
            </Stack.Item>
            <Stack.Item grow={3}>
              <DatePicker
                placeholder="Select a To Registration Date..."
                ariaLabel="Select a To Registration Date"
                label='To Registration Date'
                id='toDate'
                // value={new Date()}
                onSelectDate={(date: Date) => { this.setState({ toDate: date, itemsFound: [] }); }}
              />
            </Stack.Item>
            <Stack.Item grow={3}>
              <Dropdown
                placeholder="Select a Report"
                label="Select Report"
                id='selectedReport'
                options={[{ key: VitalStatsContentTypeIDs.DeathRegistration, text: 'Death Report' }, { key: VitalStatsContentTypeIDs.StillBirth, text: 'Still Birth Report' }]}
                onChange={(event, option: IDropdownOption) => { this.setState({ selectedReport: option.key as VitalStatsContentTypeIDs, itemsFound: [] }); }}
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
          {
            this.state?.itemsFound?.length > 0 &&
            <DetailsList
              items={this.state?.itemsFound}
              compact={true}
              columns={this.state.selectedReport === VitalStatsContentTypeIDs.DeathRegistration ? DETAIL_LIST_DEATH_REG_COLUMNS : DETAIL_LIST_STILL_BIRTH_COLUMNS}
              selectionMode={SelectionMode.none}
            />
          }
          <div>
            Date Printed: {new Date().toLocaleDateString()}
          </div>
        </div>
        <hr />
        <PackageSolutionVersion />
      </div >
    );
  }
}
