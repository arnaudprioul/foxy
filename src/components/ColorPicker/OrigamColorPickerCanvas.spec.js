import { mount } from '@vue/test-utils';
import Origamcolorpickercanvas from './OrigamColorPickerCanvas';

describe('Spec Origamcolorpickercanvas', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpickercanvas);
		expect(wrapper)
			.toBeTruthy();
	});
});
