import { mount } from '@vue/test-utils';
import Foxuicolorpickerpreview from './FoxuiColorPickerPreview';

describe('Spec Foxuicolorpickerpreview', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpickerpreview);
		expect(wrapper)
			.toBeTruthy();
	});
});
