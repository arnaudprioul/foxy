import { mount } from '@vue/test-utils';
import Foxuicolorpickercanvas from './FoxuiColorPickerCanvas';

describe('Spec Foxuicolorpickercanvas', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpickercanvas);
		expect(wrapper)
			.toBeTruthy();
	});
});
