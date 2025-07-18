import { mount } from '@vue/test-utils';
import Foxuifield from './FoxuiField.vue';

describe('Spec Foxuifield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuifield);
		expect(wrapper)
			.toBeTruthy();
	});
});
