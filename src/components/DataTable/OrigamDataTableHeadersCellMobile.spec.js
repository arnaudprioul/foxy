import { mount } from '@vue/test-utils'
import Origamdatatableheaderscellmobile from './OrigamDataTableHeadersCellMobile.vue'

describe('Spec Origamdatatableheaderscellmobile', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatableheaderscellmobile)
		expect(wrapper)
			.toBeTruthy()
	})
})
