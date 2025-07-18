import { mount } from '@vue/test-utils';
import Origamcheckbox from './OrigamCheckbox.vue';

describe('Spec Origamcheckbox', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcheckbox);
		expect(wrapper)
			.toBeTruthy();
	});
});
