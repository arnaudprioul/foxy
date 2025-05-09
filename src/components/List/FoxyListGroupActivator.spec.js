import { mount } from '@vue/test-utils';
import Foxylistgroupactivator from './FoxyListGroupActivator.vue';

describe('Spec Foxylistgroupactivator', function () {
	it('mounts', () => {
		const wrapper = mount(Foxylistgroupactivator);
		expect(wrapper)
			.toBeTruthy();
	});
});
