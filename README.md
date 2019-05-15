# My solution to Cozi's "Homework" assignment

## Spec Deviations

Some deviations from the spec were necessary through the course of the project, due to a lack of experience in specific areas and a tight time limit.
- ReactNative was not used, so I've substituted swipes out for buttons where necessary
- The design looks as close as possible to the spec, but due to rusty CSS experience, the design feels very basic. I focused my attention on React component and reducer organization.
- Testing was done 100% on my Windows machine, running the latest version of Firefox in 1920x1080. There may be uncaught issues on other browsers, though I tried to make sure everything was compatible.

## Engineer Notes

As requested in the spec:
- The location of the Search Results URL is on line 5 of searchResultsReducer.js
- The location of the User Settings URL is on line 6 of the userSettingsReducer.js
- The default list of saved pets is on line 2 of savedPetsReducer.js, and an example pet lives on lines 4-14.

## Smaller notes and thoughts on the project

### Frameworks used and why I chose them

- create-react-app to enable a fast spin-up
- Redux for centralized and easy application state management
- redux-api-middleware to enable very easy async API-calling redux actions
- Jest (comes packaged with create-react-app) and Enzyme for testing
- Not a framework, but Prettier was used for code formatting (holds all code to a single, agreed-upon look, which I like. The alternative would be a company-wide lint document, which is what I've had before)

### What I'd add given more time

- More tests are a must. Right now I have tests that cover each redux action and response, but no component tests or Enzyme snapshots
- React's prop-types framework is a must for clarity in larger projects
- Clean up / beautify the UI (possibly with bootstrap or another framework)
  - Loading spinners would be a top priority. The lack of loading spinners makes everything feel "janky".
- Change paths into Webpack's Module paths (exchanging ugly things like "../../components/theThingWeWant/" into a much more elegant "components/theThingWeWant")
- The modal is just a paragraph and button--that could easily be changed to something better-looking

### Design considerations and my thoughts on what I'd change

- Filtering and user setting management ought to be a back-end task - having to deal with it on the front-end instead was an interesting challenge
- Obviously this project isn't designed to be future proof (since it's not a real product!) but I'd change some things out given the chance. "Dog or cat" as a single string with no option for both was a bit painful, and of course, would forbid any new kinds of pet from being added.
- I briefly attempted to make this project from scratch with babel and flow instead of webpack. Though I scrapped that (for a project of this size, not worth the setup), I am a huge fan of flow typing (or typescript) and would add it to any future projects (especially if I was working with Node instead of React)

## Final regards

Thank you for this opportunity! This project was enjoyable to work on--spinning up a product from scratch gave me a better appreciation and understanding of the underlying mechanisms, like Webpack.