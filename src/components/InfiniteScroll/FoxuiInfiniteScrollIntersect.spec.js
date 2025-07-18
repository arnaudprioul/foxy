import { mount } from '@vue/test-utils'
import Foxuiinfinitescrollintersect from './FoxuiInfiniteScrollIntersect.vue'

describe('Spec Foxuiinfinitescrollintersect', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiinfinitescrollintersect)
		expect(wrapper)
			.toBeTruthy()
	})
})
