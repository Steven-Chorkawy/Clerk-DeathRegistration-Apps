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

export interface IFuneralHomeInvoiceTableState {
    TotalFees: number;
}

export default class FuneralHomeInvoiceTable extends React.Component<IFuneralHomeInvoiceTableProps, IFuneralHomeInvoiceTableState> {
    constructor(props: any) {
        super(props);

        let total = 0;
        this.props.ListItems.forEach((value) => {
            total += Number(value.Fee);
        });

        this.state = {
            TotalFees: Number(total)
        };
    }

    private _onRenderDetailsFooter(detailsFooterProps: any): any {
        return <div style={{ textAlign: 'right' }}>
            <b>TOTAL: {FormatCurrency(detailsFooterProps.totalFees)}</b>
        </div>;
    }

    public render(): React.ReactElement<{}> {
        //#region DetailList Column Constants
        const DETAIL_LIST_DEATH_REG_COLUMNS: IColumn[] = [
            {
                key: 'columnTitle',
                name: 'Deceased',
                fieldName: 'Title',
                minWidth: 90,
            },
            {
                key: 'columnDateOfDeath',
                name: 'Death Date',
                fieldName: 'DateOfDeath',
                minWidth: 120,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationDate',
                name: 'Registration Date',
                fieldName: 'RegistrationDate',
                minWidth: 120,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationNumber',
                name: 'Registration Num',
                fieldName: 'RegistrationNumber',
                minWidth: 120,
            },
            {
                key: 'columnFee',
                name: "Cost",
                fieldName: "Fee",
                minWidth: 90,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span style={{ paddingRight: '30px' }}>{FormatCurrency(Number(item.Fee))}</span>
            },
        ];

        const DETAIL_LIST_STILL_BIRTH_COLUMNS: IColumn[] = [
            {
                key: 'columnTitle',
                name: 'Child',
                fieldName: 'Title',
                minWidth: 90,
            },
            {
                key: 'columnDateOfDeath',
                name: 'Date of Birth',
                fieldName: 'DateOfDeath',
                minWidth: 120,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.DateOfDeath).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationDate',
                name: 'Registration Date',
                fieldName: 'RegistrationDate',
                minWidth: 120,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span>{new Date(item.RegistrationDate).toLocaleDateString()}</span>
            },
            {
                key: 'columnRegistrationNumber',
                name: 'Registration Num',
                fieldName: 'RegistrationNumber',
                minWidth: 120,
            },
            {
                key: 'columnFee',
                name: "Cost",
                fieldName: "Fee",
                minWidth: 90,
                onRender: (item: IStillAndDeathRegisterListItem_FromList) => <span style={{ paddingRight: '30px' }}>{FormatCurrency(Number(item.Fee))}</span>
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
                        onRenderDetailsFooter={(props: any) => this._onRenderDetailsFooter({ ...props, totalFees: this.state.TotalFees })}
                    />
                </div>
            </div>
        );
    }
}
