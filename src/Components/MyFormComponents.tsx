import { ComboBox, DatePicker, Dropdown, TextField, Toggle } from "@fluentui/react";
import { ILocationPickerItem, LocationPicker } from "@pnp/spfx-controls-react/lib/LocationPicker";
import { FieldRenderProps } from "@progress/kendo-react-form";
import * as React from "react";
import { GetNextRegistrationNumber } from "../MyHelperMethods/MyHelperMethods";
import { VitalStatsContentTypes } from "../MyHelperMethods/VitalStatsContentTypes";


//#region 
const DROPDOWN_WRAPPER_STYLE: React.CSSProperties = {
    maxWidth: '500px'
}

export const FormSubTitle = (text: string): any => {
    return (
        <div>
            <h2>{text}</h2>
        </div>
    );
}

export const MyTextField = (fieldRenderProps: FieldRenderProps): any => {
    return (
        <TextField
            {...fieldRenderProps}
            onBlur={(e) => {
                // Automatically correct blank spaces.
                if (fieldRenderProps.value) {
                    fieldRenderProps.onChange({ value: fieldRenderProps.value.trim() });
                }
            }}
        />
    );
}

export const DeathRegistrationNumberInput = (fieldRenderProps: FieldRenderProps): any => {
    const [numberToggle, setNumberToggle] = React.useState(true);
    return (
        <div>
            <Toggle
                label="Generate Registration Number"
                defaultChecked
                onText="Yes"
                offText="No"
                onChange={(e, checked) => {
                    // Set it to null by default.
                    fieldRenderProps.onChange({ value: null });
                    setNumberToggle(checked);

                    // Only if checked is true will we generate the next number.
                    if (checked) {
                        GetNextRegistrationNumber(VitalStatsContentTypes.DeathRegistration).then(value => {
                            fieldRenderProps.onChange({ value: value })
                        }).catch(reason => {
                            alert('Failed to get next registration number!');
                            console.error(reason);
                        })
                    }
                }}
            />
            <div>
                {
                    (numberToggle === false) &&
                    <div>No Registration Number Required.</div>
                }
            </div>
        </div>
    );
}

export const MyToggle = (fieldRenderProps: FieldRenderProps): any => {
    return (<div>
        <Toggle
            {...fieldRenderProps}
            onChange={(e, checked) => {
                fieldRenderProps.onChange({ value: checked })
            }}
        />
    </div>);
}

export const MyDropdown = (fieldRenderProps: FieldRenderProps): any => {
    const {
        options,
        onChange,
    } = fieldRenderProps;
    return (
        <div style={DROPDOWN_WRAPPER_STYLE}>
            <Dropdown
                {...fieldRenderProps}
                options={options}
                onChange={(e, opts) => {
                    onChange({ value: opts.text });
                }}
            />
        </div>
    );
}

export const MyComboBox = (fieldRenderProps: FieldRenderProps): any => {
    return (
        <div style={DROPDOWN_WRAPPER_STYLE}>
            <ComboBox
                {...fieldRenderProps}
                options={fieldRenderProps.options}
                autoComplete="on"
                allowFreeInput={true}
                useComboBoxAsMenuWidth
                onChange={(e, option) => fieldRenderProps.onChange({ value: option.text })}
            />
        </div>
    );
}

export const MyDatePicker = (fieldRenderProps: FieldRenderProps): any => {
    return (
        <div>
            <DatePicker
                {...fieldRenderProps}
                onSelectDate={e => { fieldRenderProps.onChange({ value: e }) }}
            />
        </div>
    );
}

export const MyLocationPicker = (fieldRenderProps: FieldRenderProps): any => {
    return (
        <div>
            <LocationPicker
                {...fieldRenderProps}
                context={fieldRenderProps.context}
                onChange={(newValue: ILocationPickerItem) => {
                    // Note that JSON.stringify is required.
                    fieldRenderProps.onChange({ value: JSON.stringify(newValue) });
                }}
            />
        </div>
    );
}

