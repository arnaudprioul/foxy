import { mount } from '@vue/test-utils';
import Foxuilistgroupactivator from './FoxuiListGroupActivator.vue';

describe('Spec Foxuilistgroupactivator', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilistgroupactivator);
		expect(wrapper)
			.toBeTruthy();
	});
});
