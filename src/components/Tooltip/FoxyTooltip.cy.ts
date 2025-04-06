import FoxyTooltip from './FoxyTooltip.vue'

describe('<FoxyTooltip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTooltip), {})
  })
})
