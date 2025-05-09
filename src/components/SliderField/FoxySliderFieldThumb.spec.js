import { mount } from '@vue/test-utils'
import Foxysliderfieldthumb from './FoxySliderFieldThumb.vue'

describe('Spec Foxysliderfieldthumb', function () {
	it('mounts', () => {
		const wrapper = mount(Foxysliderfieldthumb)
		expect(wrapper)
			.toBeTruthy()
	})
})
