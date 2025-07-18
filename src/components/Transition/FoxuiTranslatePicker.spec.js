import { mount } from '@vue/test-utils';
import Foxuitranslatepicker from './FoxuiTranslatePicker.vue';

describe('Spec Foxuitranslatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitranslatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
