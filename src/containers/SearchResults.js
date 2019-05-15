import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './SearchResults.module.scss'
import { savePet } from '../reducers/savedPetsReducer'
import { getSearchResultsFromRemote } from '../reducers/searchResultsReducer'
import { getSettingsFromRemote } from '../reducers/userSettingsReducer'

const placeholderImage =
  'http://clipart-library.com/newimages/box-clip-art-23.png' // free use image

const placeholderPet = {
  id: -1,
  type: 'cat',
  name: "Shrodinger's cat (dog?)",
  img: placeholderImage,
  sex: '?',
  age: 0,
  profile: "If you're seeing this, you've exhausted your queue!"
}

export class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.savePet = this.savePet.bind(this)
    this.skipPet = this.skipPet.bind(this)
    this.conditionallyExecute = this.conditionallyExecute.bind(this)
    this.filterPetsBasedOnPreferences = this.filterPetsBasedOnPreferences.bind(
      this
    )
    this.state = {
      filteredPets: [],
      currentPetIndex: 0
    }
  }

  componentDidMount() {
    if (!this.props.userSettings.locallyModified) {
      this.props.getSettingsFromRemote()
    }
    this.props.getSearchResultsFromRemote()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.searchResults !== prevProps.searchResults ||
      this.props.userSettings !== prevProps.userSettings
    ) {
      const petsWithoutSavedPets = this.filterPets(
        this.props.searchResults,
        this.props.savedPets
      )
      const petsFilteredByPreferences = this.filterPetsBasedOnPreferences(
        petsWithoutSavedPets,
        this.props.userSettings
      )
      this.setState({
        filteredPets: petsFilteredByPreferences
      })
    }
  }

  filterPetsBasedOnPreferences(pets, preferences) {
    return _(pets)
      .filter(pet => {
        // match cat/dog
        if (!preferences.typePreference) {
          return true
        }
        if (preferences.typePreference !== pet.type) {
          return false
        }
        return true
      })
      .filter(pet => {
        // match age
        return (
          pet.age >= preferences.ageRange.min &&
          pet.age <= preferences.ageRange.max
        )
      })
      .value()
  }

  filterPets(pets, petsToRemove) {
    return _.differenceBy(pets, petsToRemove, 'id')
  }

  //mostly to simplify code below
  conditionallyExecute(willExecute, funcToExecute) {
    if (willExecute) {
      return funcToExecute()
    }
  }

  savePet(currentPet) {
    this.setState({
      currentPetIndex: this.state.currentPetIndex + 1
    })
    return this.props.savePet(currentPet)
  }

  skipPet() {
    this.setState({
      currentPetIndex: this.state.currentPetIndex + 1
    })
  }

  render() {
    const outOfPets =
      this.state.currentPetIndex >= this.state.filteredPets.length
    const currentPet = !outOfPets
      ? this.state.filteredPets[this.state.currentPetIndex]
      : placeholderPet

    return (
      <div className={styles.searchResults}>
        <img
          className={styles.img}
          src={currentPet.img || placeholderImage}
          alt={`${currentPet.name}`}
        />
        <div className={styles.name}>
          {`${currentPet.name}, ${currentPet.age}yr, ${currentPet.sex}`}
        </div>
        <div className={styles.profile}>{currentPet.profile}</div>
        <div className={styles.selection}>
          <button
            onClick={() =>
              this.conditionallyExecute(!outOfPets, () => this.skipPet())
            }
            className={styles.skip}
            disabled={outOfPets}
          >
            Skip
          </button>
          <button
            onClick={() =>
              this.conditionallyExecute(!outOfPets, () =>
                this.savePet(currentPet)
              )
            }
            className={styles.save}
            disabled={outOfPets}
          >
            Save
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSearchResultsFromRemote,
      getSettingsFromRemote,
      savePet
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults.searchResults,
    userSettings: state.settings,
    savedPets: state.savedPets.savedPets
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults)
