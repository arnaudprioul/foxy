import { mount } from '@vue/test-utils'
import Foxydatatableheaderscellmobile from './FoxyDataTableHeadersCellMobile.vue'

describe('Spec Foxydatatableheaderscellmobile', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatableheaderscellmobile)
		expect(wrapper)
			.toBeTruthy()
	})
})
