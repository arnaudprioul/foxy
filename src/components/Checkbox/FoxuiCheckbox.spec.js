import { mount } from '@vue/test-utils';
import Foxuicheckbox from './FoxuiCheckbox.vue';

describe('Spec Foxuicheckbox', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicheckbox);
		expect(wrapper)
			.toBeTruthy();
	});
});
