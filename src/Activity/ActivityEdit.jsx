import React, { Component } from 'react';
import './styles.css';

//Redux Setup
import { connect } from 'react-redux';

//Import actions
import { editActivity, getActivityById } from '../actions/actions';

//Date picker
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

//Time picker
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
const format = 'h:mm a';
// const now = moment().hour(0).minute(0);

class ActivityEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: null,
      id: null,
    }
  }

  //Lifecycle Methods
  componentDidMount() {
    //This id comes form the url
    const activityId = this.props.match.params.id;
    this.setState({
      id: Number(activityId)
    })
    this.props.dispatch(getActivityById(activityId));
  }

  //Helper functions
  handleChange = (e) => {
    console.log("ActivityEdit - handleChange");
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      id: this.props.activityById.id,
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit - Updated to this.state:", this.state);

    //Dispatch editActivity action
    this.props.dispatch(editActivity(this.state, this.props.activityById.id));

    //Redirect to activity page
    this.props.history.push(`/activity/${this.props.activityById.id}`);
  }

  setTime = (value) => {
    // console.log("setTime", value.format(format))

    this.setState({
      time: value.format(format)
    })
  }
  setDates(array) {
    // console.log('setDates', array)
    if (this.state.date === null) {
      this.setState({
        date: moment(array[1])
      })
    } else {
      console.log("NOT NULL")
    }
  }

  render() {
    let dd = (this.props.location.search).split("?")
    this.setDates(dd)
    // console.log("ActivityEdit - render - this.props:", this.props);
    // console.log("ActivityEdit - render - this.state:", this.state);

    return (
      <div className="container col12">
        <div className="wrap-form">
          <form className="col12" onSubmit={this.handleSubmit}>
            <div className="formbottom">
              <h2 className="blue">Activity</h2>
              <div className="form-group">
                <input type="text" id="name" name="activity_name" onChange={this.handleChange} className="form-control" defaultValue={this.props.activityById.activity_name} required></input>
                <label className="form-control-placeholder" htmlFor="name">Activity name</label>
              </div>
              <div className="form-group">
                <input type="text" id="location" name="location" onChange={this.handleChange} className="form-control" defaultValue={this.props.activityById.location} required></input>
                <label className="form-control-placeholder" htmlFor="location">Location</label>
              </div>
              <select className="formselect" name="type" onChange={this.handleChange}>
                <option value={this.props.activityById.type}>{this.props.activityById.type}</option>
                <option value="sightseeing">Sightseeing</option>
                <option value="outdoors">Outdoors</option>
                <option value="indoors">Indoors</option>
                <option value="food">Food</option>
              </select>
              <div>
                <label className="blue formsection">Details</label>
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  id="your_unique_id" // PropTypes.string.isRequired,
                />
                <TimePicker showSecond={false} placeholder={this.props.activityById.time} defaultValue={this.state.time} className="xxx" onChange={this.setTime} use12Hours inputReadOnly />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" min="0.00" max="10000.00" step="0.01" name="price" onChange={this.handleChange} className="reginput inputstyle" defaultValue={this.props.activityById.price}></input>
              </div>
              {/* <div className="form-group">
                <input type="text" id="image" name="image" onChange={this.handleChange} className="form-control" defaultValue={this.props.activityById.image}></input>
                <label className="form-control-placeholder" htmlFor="image">Include an image (url)</label>
              </div> */}
              <div className="form-group">
                <label>Do you have a reservation?</label>
                <select name="reservation" onChange={this.handleChange}>
                  <option value={this.props.activityById.reservation}>{this.props.activityById.reservation}
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="blue formsection">Notes</label>
                <textarea onChange={this.handleChange} name="notes" defaultValue={this.props.activityById.notes}></textarea>
              </div>

              <button type="submit">Update Activity</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    activityById: state.activityById
  }
}

export default connect(mapStateToProps)(ActivityEdit);

ActivityEdit.defaultProps = {
  activityById: {
    id: null,
  }
}