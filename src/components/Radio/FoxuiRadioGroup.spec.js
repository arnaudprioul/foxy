import { mount } from '@vue/test-utils'
import Foxuiradiogroup from './FoxuiRadioGroup.vue'

describe('Spec Foxuiradiogroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiradiogroup)
		expect(wrapper)
			.toBeTruthy()
	})
})
