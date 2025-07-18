import { mount } from '@vue/test-utils';
import Foxycolorpickerswatches from './FoxyColorPickerSwatches';

describe('Spec Foxycolorpickerswatches', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycolorpickerswatches);
		expect(wrapper)
			.toBeTruthy();
	});
});
