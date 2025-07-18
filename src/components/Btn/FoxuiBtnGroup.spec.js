import { mount } from '@vue/test-utils';
import Foxuibtngroup from './FoxuiBtnGroup.vue';

describe('Spec Foxuibtngroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibtngroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
