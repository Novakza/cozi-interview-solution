import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './UserSettings.module.scss'
import {
  setSettings,
  getSettingsFromRemote
} from '../reducers/userSettingsReducer'

export class UserSettings extends React.Component {
  componentDidMount() {
    if (!this.props.settings.locallyModified) {
      this.props.getSettingsFromRemote()
    }
  }

  render() {
    return (
      <div className={styles.container} key={this.props.settings.id}>
        <h1>Adopter Profile</h1>
        <textarea
          onBlur={e => this.props.setSettings({ profile: e.target.value })}
          defaultValue={this.props.settings.profile}
        />
        <h1>Preferences</h1>
        <div className={styles.animalPreference}>
          <p>Animal (checked=Cat)</p>
          <input
            type="checkbox"
            name="isCat"
            value="isCat"
            defaultChecked={this.props.settings.typePreference === 'cat'}
            onChange={e =>
              this.props.setSettings({
                typePreference: e.target.checked ? 'cat' : 'dog'
              })
            }
          />
        </div>
        <div className={styles.agePreference}>
          <p>Age</p>
          <input
            type="text"
            name="min"
            placeholder="min"
            defaultValue={this.props.settings.ageRange.min}
            onChange={e => {
              const newMin = e.target.value
              if (!isNaN(newMin)) {
                this.props.setSettings({
                  ageRange: {
                    min: +newMin // + casts to number
                  }
                })
              }
            }}
          />
          <input
            type="text"
            name="max"
            placeholder="max"
            defaultValue={this.props.settings.ageRange.max}
            onChange={e => {
              const newMax = e.target.value
              if (!isNaN(newMax)) {
                console.log(newMax)
                this.props.setSettings({
                  ageRange: {
                    max: +newMax // + casts to number
                  }
                })
              }
            }}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSettingsFromRemote,
      setSettings
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings)
