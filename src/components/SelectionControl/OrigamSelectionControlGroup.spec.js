import { mount } from '@vue/test-utils'
import Origamselectioncontrolgroup from './OrigamSelectionControlGroup.vue'

describe('Spec Origamselectioncontrolgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origamselectioncontrolgroup)
		expect(wrapper)
			.toBeTruthy()
	})
})
