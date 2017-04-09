# react-date-dropdown
A simple dropdown to select date using 3 dropdown options.

#### Citations
A simple react drop down to select dates using 'react-dropdown' (https://github.com/fraserxu/react-dropdown)
This component uses moment.js


#### Usages
name : name of the element, startRange : String, endRange: String, initialValue :String, format: format String,
onChange : func(value, formatted value)

eg : <DateSelect name="dob" startRange={moment().subtract(100, 'years').format("YYYY-MM-DD")}
                endRange={moment().subtract(18, 'years').format("YYYY-MM-DD")} initialValue={this.props.dob} format={"YYYY-MM-DD"}
                onChange={this.handleDobChange.bind(this)} />
