import { mount } from '@vue/test-utils';
import Origamcolorpickerswatches from './OrigamColorPickerSwatches';

describe('Spec Origamcolorpickerswatches', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpickerswatches);
		expect(wrapper)
			.toBeTruthy();
	});
});
