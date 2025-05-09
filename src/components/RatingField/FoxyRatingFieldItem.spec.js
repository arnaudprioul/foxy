import { mount } from '@vue/test-utils'
import Foxyratingfielditem from './FoxyRatingFieldItem.vue'

describe('Spec Foxyratingfielditem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyratingfielditem)
		expect(wrapper)
			.toBeTruthy()
	})
})
