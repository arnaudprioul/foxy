import { mount } from '@vue/test-utils';
import Foxuicolorpickeredit from './FoxuiColorPickerEdit';

describe('Spec Foxuicolorpickeredit', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpickeredit);
		expect(wrapper)
			.toBeTruthy();
	});
});
