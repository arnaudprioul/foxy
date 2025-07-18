import { mount } from '@vue/test-utils';
import Origamtranslatepicker from './OrigamTranslatePicker.vue';

describe('Spec Origamtranslatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtranslatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
