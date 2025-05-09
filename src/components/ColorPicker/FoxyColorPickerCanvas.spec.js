import { mount } from '@vue/test-utils';
import Foxycolorpickercanvas from './FoxyColorPickerCanvas';

describe('Spec Foxycolorpickercanvas', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycolorpickercanvas);
		expect(wrapper)
			.toBeTruthy();
	});
});
