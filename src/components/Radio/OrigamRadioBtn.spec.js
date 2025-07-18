import { mount } from '@vue/test-utils'
import Origamradiobtn from './OrigamRadioBtn.vue'

describe('Spec Origamradiobtn', function () {
	it('mounts', () => {
		const wrapper = mount(Origamradiobtn)
		expect(wrapper)
			.toBeTruthy()
	})
})
