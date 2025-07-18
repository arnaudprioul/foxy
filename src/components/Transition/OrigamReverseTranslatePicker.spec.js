import { mount } from '@vue/test-utils';
import Origamreversetranslatepicker from './OrigamReverseTranslatePicker.vue';

describe('Spec Origamreversetranslatepicker', function () {
	it('mounts', () => {
		const wrapper = mount(Origamreversetranslatepicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
