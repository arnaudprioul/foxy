import { mount } from '@vue/test-utils';
import Foxyreversetranslatepicker from './FoxyReverseTranslatePicker.vue';

describe('Spec Foxyreversetranslatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyreversetranslatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
