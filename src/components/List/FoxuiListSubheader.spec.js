import { mount } from '@vue/test-utils';
import Foxuilistsubheader from './FoxuiListSubheader.vue';

describe('Spec Foxuilistsubheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilistsubheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
