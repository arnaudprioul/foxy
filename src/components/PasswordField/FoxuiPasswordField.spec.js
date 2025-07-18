import { mount } from '@vue/test-utils'
import Foxuipasswordfield from './FoxuiPasswordField.vue'

describe('Spec Foxuipasswordfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuipasswordfield)
		expect(wrapper)
			.toBeTruthy()
	})
})
