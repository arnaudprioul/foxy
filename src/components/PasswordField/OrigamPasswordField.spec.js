import { mount } from '@vue/test-utils'
import Origampasswordfield from './OrigamPasswordField.vue'

describe('Spec Origampasswordfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origampasswordfield)
		expect(wrapper)
			.toBeTruthy()
	})
})
