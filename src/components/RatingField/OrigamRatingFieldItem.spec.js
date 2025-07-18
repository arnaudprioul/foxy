import { mount } from '@vue/test-utils'
import Origamratingfielditem from './OrigamRatingFieldItem.vue'

describe('Spec Origamratingfielditem', function () {
	it('mounts', () => {
		const wrapper = mount(Origamratingfielditem)
		expect(wrapper)
			.toBeTruthy()
	})
})
