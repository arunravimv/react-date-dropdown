# react-date-dropdown
A simple dropdown to select date using 3 dropdown options.

#### Citations
A simple react drop down to select dates using 'react-dropdown' (https://github.com/fraserxu/react-dropdown)
This component uses moment.js


#### Usages
name : name of the element, startYear : Int, endYear: Int, initialValue :String, format: format String,
onChange : func(value, formatted value)

eg : <DateSelect name="dob" startYear={moment().subtract(100, 'years').year()}
                endYear={moment().subtract(18, 'years').year()} initialValue={this.props.dob} format={"YYYY-MM-DD"}
                onChange={this.handleDobChange.bind(this)} />
