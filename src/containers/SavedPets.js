import React from 'react'
import { connect } from 'react-redux'
import styles from './SearchResults.module.scss'
import SmallPetView from '../components/SmallPetView/SmallPetView'
import Modal from 'react-modal'
Modal.setAppElement('body') // required for screenreader compatibility (and to prevent warnings ;) )

export class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      isModalOpen: false,
      currentModalProfile: ''
    }
  }

  openModal(modalProfileToSet) {
    this.setState({
      isModalOpen: true,
      currentModalProfile: modalProfileToSet
    })
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      currentModalProfile: ''
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.list}>
          {this.props.savedPets.map(pet => {
            return (
              <SmallPetView
                key={pet.id}
                onClick={() => this.openModal(pet.profile)}
                {...pet}
              />
            )
          })}
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <p>{this.state.currentModalProfile}</p>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    savedPets: state.savedPets.savedPets
  }
}

export default connect(mapStateToProps)(SearchResults)
