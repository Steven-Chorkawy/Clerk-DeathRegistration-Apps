import { DatePicker, Dropdown, Stack } from '@fluentui/react';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';


export default class RegistrationReports extends React.Component<any, {}> {
  public render(): React.ReactElement<any> {
    return (
      <div>
        <h1>Registration Reports</h1>
        <div>
          <Stack horizontal tokens={{ childrenGap: 'l1', padding: 'l1' }}>
            <DatePicker
              placeholder="Select a From Registration Date..."
              ariaLabel="Select a From Registration Date"
              label='From Registration Date'
              id='fromDate'
              value={new Date()}
            />
            <DatePicker
              placeholder="Select a To Registration Date..."
              ariaLabel="Select a To Registration Date"
              label='To Registration Date'
              id='toDate'
              value={new Date()}
            />
            <Dropdown
              placeholder="Select a Report"
              label="Select Report"
              options={[{ key: 'deathReport', text: 'Death Report' }, { key: 'stillBirthReport', text: 'Still Birth Report' }]}
            />
          </Stack>
          <PrimaryButton
            text='Click to View Report'
          />
        </div>
      </div>
    );
  }
}
