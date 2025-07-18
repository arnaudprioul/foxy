import { mount } from '@vue/test-utils';
import Foxuicolorpickerfield from './FoxuiColorPickerField';

describe('Spec Foxuicolorpickerfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpickerfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
