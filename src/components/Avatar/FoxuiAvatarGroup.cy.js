import FoxuiAvatarGroup from './FoxuiAvatarGroup.vue'
import { h } from "vue";

describe('<FoxuiAvatarGroup />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(h(FoxuiAvatarGroup), {})
	})
})
