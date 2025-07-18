import { mount } from '@vue/test-utils'
import Foxuiradiobtn from './FoxuiRadioBtn.vue'

describe('Spec Foxuiradiobtn', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiradiobtn)
		expect(wrapper)
			.toBeTruthy()
	})
})
