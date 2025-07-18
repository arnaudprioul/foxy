import { mount } from '@vue/test-utils';
import Foxuicolorpicker from './FoxuiColorPicker';

describe('Spec Foxuicolorpicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
