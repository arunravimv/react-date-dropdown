import React, {Component} from "react";
import Dropdown from "react-dropdown";
import moment from "moment";
import range from "lodash/range";

class DateSelect extends Component {
    constructor(params) {
        super(params);
        const dateObject = this.props.initialValue ? moment(moment(this.props.initialValue).format(this.props.format || "YYYY-MM-DD")) : null;
        this.state = {
            selectedYear: dateObject ? dateObject.year() : null,
            selectedMonth: dateObject ? dateObject.month() + 1 : null,
            selectedDayOfMonth: dateObject ? dateObject.date() : null,
            daysOfMonth: [],
            months: [],
            years: []
        };

        this.onMonthChange = this.onMonthChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onDayOfMonthChange = this.onDayOfMonthChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.findNumberOfDaysInMonth = this.findNumberOfDaysInMonth.bind(this);

        if (this.state.selectedYear && this.state.selectedMonth) {
            this.findNumberOfDaysInMonth(true);
        }
    }

    onChange() {
        const year = this.state.selectedYear;
        const month =  this.state.selectedMonth;
        const dayOfMonth =  this.state.selectedDayOfMonth;
        const formattedValue = moment(`${year}-${month}-${dayOfMonth}`).format(this.props.format || "YYYY-MM-DD");
        const value = moment(formattedValue);
        this.props.onChange(value, formattedValue);
    }

    findNumberOfDaysInMonth(noCallbackNeeded) {
        const _self = this;
        const MM = this.state.selectedMonth;
        const YYYY = this.state.selectedYear;
        if (MM && YYYY) {
            const numberOfDaysInMonth = moment(`${MM}-${YYYY}`, 'MM-YYYY').daysInMonth();
            _self.setState({daysOfMonth: range(1, numberOfDaysInMonth + 1)}, () => {
                if (_self.state.selectedDayOfMonth && _self.state.selectedDayOfMonth > numberOfDaysInMonth) {
                    this.setState({selectedDayOfMonth: 1}, () => {
                        !noCallbackNeeded && _self.onChange();
                    })
                } else if (_self.state.selectedDayOfMonth && _self.state.selectedDayOfMonth <= numberOfDaysInMonth) {
                    !noCallbackNeeded && _self.onChange();
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
        let months = range(1, 13).map((thisMonth) => {
            return {
                value: thisMonth,
                label: moment(`${thisMonth}`, "MM").format("MMMM").toUpperCase()
            }
        });

        this.setState({
            months: months,
            years: years
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
                <h6>
                    <span>Please select Year and Month First <br/></span>
                </h6>
            </div>

        )
    }


}

export default DateSelect;