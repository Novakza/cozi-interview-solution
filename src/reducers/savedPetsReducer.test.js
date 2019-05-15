import savedPetsReducer, { SAVE_PET } from './savedPetsReducer'

const baseState = {
  savedPets: []
}

const testPet = {
  id: 1012,
  type: 'cat',
  name: 'Pepper',
  img: null,
  sex: 'F',
  age: 4,
  profile:
    "Pepper is a loving rescue cat with major abandonment issues. She is always sleeping near her owner, or riding on her owner's shoulder."
}

describe('saved pets reducer', () => {
  it('should return the initial state', () => {
    expect(savedPetsReducer(undefined, {})).toEqual(baseState)
  })

  it('should add pet to the state', () => {
    const action = {
      type: SAVE_PET,
      pet: testPet
    }
    expect(savedPetsReducer(baseState, action)).toEqual({
      savedPets: [testPet]
    })
  })
})
