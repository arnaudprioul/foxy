import { mount } from '@vue/test-utils';
import Origamcolorpickerpreview from './OrigamColorPickerPreview';

describe('Spec Origamcolorpickerpreview', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpickerpreview);
		expect(wrapper)
			.toBeTruthy();
	});
});
