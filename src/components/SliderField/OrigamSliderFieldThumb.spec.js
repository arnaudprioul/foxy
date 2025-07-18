import { mount } from '@vue/test-utils'
import Origamsliderfieldthumb from './OrigamSliderFieldThumb.vue'

describe('Spec Origamsliderfieldthumb', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsliderfieldthumb)
		expect(wrapper)
			.toBeTruthy()
	})
})
