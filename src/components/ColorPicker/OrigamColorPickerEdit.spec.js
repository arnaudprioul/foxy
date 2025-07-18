import { mount } from '@vue/test-utils';
import Origamcolorpickeredit from './OrigamColorPickerEdit';

describe('Spec Origamcolorpickeredit', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpickeredit);
		expect(wrapper)
			.toBeTruthy();
	});
});
