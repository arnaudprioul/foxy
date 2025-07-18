import { mount } from '@vue/test-utils'
import Foxuisliderfieldtrack from './FoxuiSliderFieldTrack.vue'

describe('Spec Foxuisliderfieldtrack', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisliderfieldtrack)
		expect(wrapper)
			.toBeTruthy()
	})
})
