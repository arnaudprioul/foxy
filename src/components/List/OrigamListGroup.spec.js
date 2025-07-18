import { mount } from '@vue/test-utils';
import Origamlistgroup from './OrigamListGroup.vue';

describe('Spec Origamlistgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlistgroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
