// largely inspired by this tutorial: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

const key = 'savedPets'

export const loadState = () => {
  try {
    const savedPetsState = localStorage.getItem(key)
    if (!savedPetsState) {
      return savedPetsState
    } else {
      return JSON.parse(savedPetsState)
    }
  } catch (err) {
    return null
  }
}

export const saveState = state => {
  try {
    const stateJsonString = JSON.stringify(state)
    localStorage.setItem(key, stateJsonString)
  } catch (err) {
    // log (were this not a proof of concept)
  }
}
