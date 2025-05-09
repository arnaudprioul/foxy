import { mount } from '@vue/test-utils';
import Foxycolorpickerfield from './FoxyColorPickerField';

describe('Spec Foxycolorpickerfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycolorpickerfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
