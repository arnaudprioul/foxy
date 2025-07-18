import { mount } from '@vue/test-utils';
import Foxuireversetranslatepicker from './FoxuiReverseTranslatePicker.vue';

describe('Spec Foxuireversetranslatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuireversetranslatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
