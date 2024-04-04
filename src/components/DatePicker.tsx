import React from 'react';
import DatePicker from 'react-datepicker';
import { useField, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props); // Use `props` instead of `props.name`

    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => helpers.setValue(val)}
                onBlur={() => helpers.setTouched(true)}
                dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
};

export default CustomDatePicker;