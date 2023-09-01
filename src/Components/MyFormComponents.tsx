import { DatePicker, Dropdown, Toggle } from "@fluentui/react";
import { ILocationPickerItem, LocationPicker } from "@pnp/spfx-controls-react/lib/LocationPicker";
import { FieldRenderProps } from "@progress/kendo-react-form";
import * as React from "react";
import { GetNextRegistrationNumber } from "../MyHelperMethods/MyHelperMethods";

// export const MyTextField = (fieldRenderProps: FieldRenderProps) => {
//     const { validationMessage, visited, label, id, valid, ...others } =
//         fieldRenderProps;
//     const showValidationMessage: string | false | null =
//         visited && validationMessage;
//     return (
//         <FieldWrapper>
//             <div className={"k-form-field-wrap"}>
//                 <Label editorId={id} editorValid={valid}>
//                     {label}
//                 </Label>
//                 <TextField id={id} {...others} />
//                 {!showValidationMessage && (
//                     <Hint>...Validation Message Here...</Hint>
//                 )}
//                 {showValidationMessage && <Error>{validationMessage}</Error>}
//             </div>
//         </FieldWrapper>
//     );
// };

export const FormSubTitle = (text: string) => {
    return (
        <div>
            <h4>{text}</h4>
        </div>
    );
}

export const DeathRegistrationNumberInput = (fieldRenderProps: FieldRenderProps) => {
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
                        GetNextRegistrationNumber().then(value => {
                            fieldRenderProps.onChange({ value: value })
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

export const MyDropdown = (fieldRenderProps: FieldRenderProps) => {
    const {
        options,
        onChange,
    } = fieldRenderProps;
    return (
        <div>
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

export const MyDatePicker = (fieldRenderProps: FieldRenderProps) => {
    return (
        <div>
            <DatePicker
                {...fieldRenderProps}
                onSelectDate={e => { fieldRenderProps.onChange({ value: e }) }}
            />
        </div>
    );
}

export const MyLocationPicker = (fieldRenderProps: FieldRenderProps) => {
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