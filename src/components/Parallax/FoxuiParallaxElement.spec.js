import { mount } from '@vue/test-utils'
import Foxuiparallaxelement from './FoxuiParallaxElement.vue'

describe('Spec Foxuiparallaxelement', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiparallaxelement)
		expect(wrapper)
			.toBeTruthy()
	})
})
