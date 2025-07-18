import { mount } from '@vue/test-utils'
import OrigamSnack from './OrigamSnack.vue'

describe('Spec Origamsnack', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamSnack)
		expect(wrapper)
			.toBeTruthy()
	})
})
