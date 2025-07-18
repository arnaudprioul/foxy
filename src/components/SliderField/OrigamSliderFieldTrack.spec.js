import { mount } from '@vue/test-utils'
import Origamsliderfieldtrack from './OrigamSliderFieldTrack.vue'

describe('Spec Origamsliderfieldtrack', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsliderfieldtrack)
		expect(wrapper)
			.toBeTruthy()
	})
})
