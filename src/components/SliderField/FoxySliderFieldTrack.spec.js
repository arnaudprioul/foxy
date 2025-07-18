import { mount } from '@vue/test-utils'
import Foxysliderfieldtrack from './FoxySliderFieldTrack.vue'

describe('Spec Foxysliderfieldtrack', function () {
	it('mounts', () => {
		const wrapper = mount(Foxysliderfieldtrack)
		expect(wrapper)
			.toBeTruthy()
	})
})
