import { mount } from '@vue/test-utils'
import Origamdatatablecolumncell from './OrigamDataTableColumnCell.vue'

describe('Spec Origamdatatablecolumncell', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatablecolumncell)
		expect(wrapper)
			.toBeTruthy()
	})
})
