import FoxuiAvatar from './FoxuiAvatar.vue'

describe('<FoxuiAvatar />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(h(FoxuiAvatar), {})
	})
})
