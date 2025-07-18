import { mount } from '@vue/test-utils'
import Foxuiselectioncontrolgroup from './FoxuiSelectionControlGroup.vue'

describe('Spec Foxuiselectioncontrolgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiselectioncontrolgroup)
		expect(wrapper)
			.toBeTruthy()
	})
})
