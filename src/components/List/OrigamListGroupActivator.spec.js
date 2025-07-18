import { mount } from '@vue/test-utils';
import Origamlistgroupactivator from './OrigamListGroupActivator.vue';

describe('Spec Origamlistgroupactivator', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlistgroupactivator);
		expect(wrapper)
			.toBeTruthy();
	});
});
