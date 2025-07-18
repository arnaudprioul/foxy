import { mount } from '@vue/test-utils'
import Origaminfinitescrollintersect from './OrigamInfiniteScrollIntersect.vue'

describe('Spec Origaminfinitescrollintersect', function () {
	it('mounts', () => {
		const wrapper = mount(Origaminfinitescrollintersect)
		expect(wrapper)
			.toBeTruthy()
	})
})
