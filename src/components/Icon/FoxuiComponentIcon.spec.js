import { mount } from '@vue/test-utils';
import Foxuicomponenticon from './FoxuiComponentIcon.vue';

describe('Spec Foxuicomponenticon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicomponenticon);
		expect(wrapper)
			.toBeTruthy();
	});
});
