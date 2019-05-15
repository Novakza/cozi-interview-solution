// constants
const defaultSavedPets = []
// Uncomment the following lines to pre-populate the list with Pepper
// const peppy = {
//   id: 1012,
//   type: 'cat',
//   name: 'Pepper',
//   img: null,
//   sex: 'F',
//   age: 4,
//   profile:
//     "Pepper is a loving rescue cat with major abandonment issues. She is always sleeping near her owner, or riding on her owner's shoulder."
// }
// defaultSavedPets.push(peppy)
const defaultState = {
  savedPets: defaultSavedPets
}

// action types
export const SAVE_PET = 'SAVE_PET'

// action creators
export const savePet = pet => ({
  type: SAVE_PET,
  pet
})

// Reducer
const userSettingsReducer = (state = defaultState, action) => {
  const reducers = {
    [SAVE_PET]: (state, action) => {
      const savedPets = [...state.savedPets, action.pet]
      return {
        ...state,
        savedPets
      }
    },
    DEFAULT: (state, action) => {
      return state
    }
  }
  return (reducers[action.type] || reducers.DEFAULT)(state, action)
}

export default userSettingsReducer
