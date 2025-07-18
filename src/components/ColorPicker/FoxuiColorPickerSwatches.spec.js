import { mount } from '@vue/test-utils';
import Foxuicolorpickerswatches from './FoxuiColorPickerSwatches';

describe('Spec Foxuicolorpickerswatches', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicolorpickerswatches);
		expect(wrapper)
			.toBeTruthy();
	});
});
