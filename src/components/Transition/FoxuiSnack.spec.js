import { mount } from '@vue/test-utils'
import FoxuiSnack from './FoxuiSnack.vue'

describe('Spec Foxuisnack', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiSnack)
		expect(wrapper)
			.toBeTruthy()
	})
})
