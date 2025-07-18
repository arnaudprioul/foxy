import { mount } from '@vue/test-utils';
import Origamcolorpickerfield from './OrigamColorPickerField';

describe('Spec Origamcolorpickerfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpickerfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
