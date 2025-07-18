import OrigamAvatar from './OrigamAvatar.vue'

describe('<OrigamAvatar />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(h(OrigamAvatar), {})
	})
})
