import { mount } from '@vue/test-utils'
import Foxuidatatableheaderscellmobile from './FoxuiDataTableHeadersCellMobile.vue'

describe('Spec Foxuidatatableheaderscellmobile', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatableheaderscellmobile)
		expect(wrapper)
			.toBeTruthy()
	})
})
