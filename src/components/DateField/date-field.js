import PropTypes from "prop-types";
import * as moment from 'moment';
import React from 'react';

function DateField(props) {
    return (
        <span>
            { props.date ? moment(props.date).format(props.format) : ''}
        </span>
    )
}

DateField.defaultProps = {
    format: 'DD-MM-yyyy'
};

DateField.propTypes = {
    date: PropTypes.any,
    format: PropTypes.string
}

export default DateField;