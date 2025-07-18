import { mount } from '@vue/test-utils'
import Foxuiratingfielditem from './FoxuiRatingFieldItem.vue'

describe('Spec Foxuiratingfielditem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiratingfielditem)
		expect(wrapper)
			.toBeTruthy()
	})
})
