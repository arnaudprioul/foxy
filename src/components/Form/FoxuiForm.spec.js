import { mount } from '@vue/test-utils'
import Foxuiform from './FoxuiForm.vue'

describe('Spec Foxuiform', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiform)
		expect(wrapper)
			.toBeTruthy()
	})
})
