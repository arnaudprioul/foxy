import { mount } from '@vue/test-utils'
import Origamform from './OrigamForm.vue'

describe('Spec Origamform', function () {
	it('mounts', () => {
		const wrapper = mount(Origamform)
		expect(wrapper)
			.toBeTruthy()
	})
})
