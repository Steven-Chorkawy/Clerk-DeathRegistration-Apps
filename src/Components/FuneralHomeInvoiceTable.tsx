import * as React from 'react';
import { IStillAndDeathRegisterListItem_FromList } from "../MyHelperMethods/IStillAndDeathRegisterListItem";
import { VitalStatsContentTypeIDs } from '../MyHelperMethods/VitalStatsContentTypes';
import { DetailsList, SelectionMode, IColumn } from '@fluentui/react';
import { FormatCurrency } from '../MyHelperMethods/MyHelperMethods';

export interface IFuneralHomeInvoiceTableProps {
    FuneralHomeName: string;
    ListItems: IStillAndDeathRegisterListItem_FromList[];
    ContentTypeId: VitalStatsContentTypeIDs;
}

export default class FuneralHomeInvoiceTable extends React.Component<IFuneralHomeInvoiceTableProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        //#region DetailList Column Constants
        const DETAIL_LIST_DEATH_REG_COLUMNS: IColumn[] = [
            {
                key: 'columnTitle',
                name: 'Deceased',
                fieldName: 'Title',
                minWidth: 30,
                maxWidth: 120,
                isResizable: true,
            },
            {
                key: 'columnDateOfDeath',
                name: 'Death Date',
                fieldName: 'DateOfDeath',
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationDate',
                name: 'Registration Date',
                fieldName: 'RegistrationDate',
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationNumber',
                name: 'Registration Num',
                fieldName: 'RegistrationNumber',
                minWidth: 30,
                maxWidth: 60,
                isResizable: true,
            },
            {
                key: 'columnFee',
                name: "Cost",
                fieldName: "Fee",
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{FormatCurrency(Number(item.Fee))}</span>
            },
        ];

        const DETAIL_LIST_STILL_BIRTH_COLUMNS: IColumn[] = [
            {
                key: 'columnTitle',
                name: 'Child',
                fieldName: 'Title',
                minWidth: 30,
                maxWidth: 120,
                isResizable: true,
            },
            {
                key: 'columnDateOfDeath',
                name: 'Date of Birth',
                fieldName: 'DateOfDeath',
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationDate',
                name: 'Registration Date',
                fieldName: 'RegistrationDate',
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationNumber',
                name: 'Registration Num',
                fieldName: 'RegistrationNumber',
                minWidth: 30,
                maxWidth: 60,
                isResizable: true,
            },
            {
                key: 'columnFee',
                name: "Cost",
                fieldName: "Fee",
                minWidth: 30,
                maxWidth: 100,
                isResizable: true,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{FormatCurrency(Number(item.Fee))}</span>
            },
        ];
        //#endregion

        return (
            <div>
                <h3 style={{ marginBottom: '0' }}>{this.props.FuneralHomeName}</h3>
                <div style={{ marginBottom: '10px' }}>
                    <DetailsList
                        items={this.props.ListItems}
                        compact={true}
                        columns={this.props.ContentTypeId === VitalStatsContentTypeIDs.DeathRegistration ? DETAIL_LIST_DEATH_REG_COLUMNS : DETAIL_LIST_STILL_BIRTH_COLUMNS}
                        selectionMode={SelectionMode.none}
                    />
                </div>
            </div>
        );
    }
}
