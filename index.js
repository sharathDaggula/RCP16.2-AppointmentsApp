// Write your code here
import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    selectedDate: '',
    showOnlyStarred: false,
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeSelectedDate = event => {
    this.setState({
      selectedDate: event.target.value,
    })
  }

  onAddAppointmentItem = event => {
    const {title, selectedDate} = this.state
    event.preventDefault()
    const newAppointment = {
      id: uuidv4(),
      title,
      selectedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      selectedDate: '',
    }))
  }

  toggleStarImage = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  toggleStarredButton = () => {
    this.setState(prevState => ({
      showOnlyStarred: !prevState.showOnlyStarred,
    }))
  }

  render() {
    const {title, selectedDate, appointmentList, showOnlyStarred} = this.state
    const filteredAppointmentsList = showOnlyStarred
      ? appointmentList.filter(each => each.isStarred)
      : appointmentList
    const isStarredButton = showOnlyStarred
      ? 'starred-button-on'
      : 'starred-button'
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="form-and-image-container">
            <div className="form-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.onAddAppointmentItem}>
                <label htmlFor="title" className="title-label">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  placeholder="title"
                  className="title"
                  id="title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <br />
                <label htmlFor="date" className="title-label">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="title"
                  id="date"
                  onChange={this.onChangeSelectedDate}
                  value={selectedDate}
                />
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointments-and-starred-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              type="button"
              className={isStarredButton}
              onClick={this.toggleStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                toggleStarImage={this.toggleStarImage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments


// AppointmentItem component code (below)

// Write your code here
import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eachAppointment, toggleStarImage} = props
  const {title, selectedDate, id, isStarred} = eachAppointment

  const finalImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChangeStarImage = () => {
    toggleStarImage(id)
  }

  const formattedDate = format(new Date(selectedDate), 'dd MMMM yyyy, EEEE')
  return (
    <li className="list-items-container">
      <div className="card-item-container">
        <div className="title-and-star-container">
          <p className="card-title">{title}</p>
          <button type="button" onClick={onChangeStarImage} data-testid="star">
            <img src={finalImgUrl} alt="star" className="star-image-styling" />
          </button>
        </div>
        <p className="selected-date">Date: {formattedDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem

