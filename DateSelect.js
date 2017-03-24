import React, {Component} from "react";
import Dropdown from "react-dropdown";
import moment from "moment";
import range from "lodash/range";

class DateSelect extends Component {
    constructor(params) {
        super(params);
        const dateObject = this.props.initialValue && this.props.format ? moment(this.props.initialValue,this.props.format) : null;
        this.state = {
            selectedYear: dateObject ? dateObject.year() : null,
            selectedMonth: dateObject ? dateObject.month() : null,
            selectedDayOfMonth: dateObject ? dateObject.date() : null,
            date: "",
            daysOfMonth: [],
            months: [],
            years: []
        };
        this.onMonthChange = this.onMonthChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onDayOfMonthChange = this.onDayOfMonthChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        // this.props.onChange(date);
        console.log("on valid change invoked");
    }

    findNumberOfDaysInMonth() {
        const _self = this;
        const MM = this.state.selectedMonth;
        const YYYY = this.state.selectedYear;
        if (MM && YYYY) {
            const numberOfDaysInMonth = moment(`${MM}-${YYYY}`, 'MM-YYYY').daysInMonth();
            _self.setState({daysOfMonth: range(1, numberOfDaysInMonth + 1)}, () => {
                if (_self.state.selectedDayOfMonth && _self.state.selectedDayOfMonth > numberOfDaysInMonth) {
                    this.setState({selectedDayOfMonth: 1}, () => {
                        _self.onChange();
                    })
                } else if (_self.state.selectedDayOfMonth && _self.state.selectedDayOfMonth <= numberOfDaysInMonth) {
                    _self.onChange();
                }
            })
        }
    }

    onYearChange(year) {
        this.setState({selectedYear: year.value}, this.findNumberOfDaysInMonth);
    }

    onMonthChange(month) {
        this.setState({selectedMonth: month.value}, this.findNumberOfDaysInMonth);
    }

    onDayOfMonthChange(day) {
        this.setState({selectedDayOfMonth: day.value}, this.onChange);
    }

    componentWillMount() {
        let startYear = this.props.startYear || moment().subtract(100, 'years').year();
        let endYear = this.props.endYear || moment().add(20, "years").year();
        let years = range(startYear, endYear);
        let dateObject = null;
        let months = range(1, 13).map((thisMonth) => {
            return {
                value: thisMonth,
                label: moment(`${thisMonth}`, "MM").format("MMMM").toUpperCase()
            }
        });
        // let endYear = moment().subtract('18',years);
        if (!this.props.initialValue) {
            // dateObject = moment();
        } else {
            dateObject = moment(this.props.initialValue)
        }

        this.setState({
            months: months,
            years: years,
            selectedYear: dateObject ? dateObject.year() : "",
            selectedMonth: dateObject ? dateObject.month() : "",
            selectedDayOfMonth: dateObject ? dateObject.day() : ""
        })

    }

    render() {
        return (
            <div className={"select-datepicker"}>
                {
                    this.state.selectedMonth ?
                        <Dropdown className={"select-month"} options={this.state.months}
                                  value={ {
                                      value: this.state.selectedMonth,
                                      label: moment(`${this.state.selectedMonth}`, "MM").format("MMMM").toUpperCase()
                                  }}
                                  placeholder={"MM"}
                                  onChange={this.onMonthChange}/>
                        : <Dropdown className={"select-month"} options={this.state.months}
                                    placeholder={"MM"}
                                    onChange={this.onMonthChange}/>
                }
                {   this.state.selectedDayOfMonth ?
                    <Dropdown className={"select-date"} options={this.state.daysOfMonth} placeholder={"DD"}
                              value={ {value: this.state.selectedDayOfMonth, label: this.state.selectedDayOfMonth}}
                              disabled={!(this.state.selectedMonth && this.state.selectedYear)}
                              onChange={this.onDayOfMonthChange}/>
                    : <Dropdown className={"select-date"} options={this.state.daysOfMonth} placeholder={"DD"}
                                disabled={!(this.state.selectedMonth && this.state.selectedYear)}
                                onChange={this.onDayOfMonthChange}/>
                }
                {
                    this.state.selectedYear ?
                        <Dropdown className={"select-year"} options={this.state.years}
                                  value={ {value: this.state.selectedYear, label: this.state.selectedYear}}
                                  placeholder={"YYYY"}
                                  onChange={this.onYearChange}/>
                        : <Dropdown className={"select-year"} options={this.state.years}
                                    placeholder={"YYYY"}
                                    onChange={this.onYearChange}/>
                }
            </div>

        )
    }


}

export default DateSelect;