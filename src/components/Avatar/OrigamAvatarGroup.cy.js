import OrigamAvatarGroup from './OrigamAvatarGroup.vue'
import { h } from "vue";

describe('<OrigamAvatarGroup />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(h(OrigamAvatarGroup), {})
	})
})
