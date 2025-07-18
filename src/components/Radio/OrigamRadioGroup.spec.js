import { mount } from '@vue/test-utils'
import Origamradiogroup from './OrigamRadioGroup.vue'

describe('Spec Origamradiogroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origamradiogroup)
		expect(wrapper)
			.toBeTruthy()
	})
})
