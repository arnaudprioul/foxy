import { mount } from '@vue/test-utils'
import Origamparallaxelement from './OrigamParallaxElement.vue'

describe('Spec Origamparallaxelement', function () {
	it('mounts', () => {
		const wrapper = mount(Origamparallaxelement)
		expect(wrapper)
			.toBeTruthy()
	})
})
