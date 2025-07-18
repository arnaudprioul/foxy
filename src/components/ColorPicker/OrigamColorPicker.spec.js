import { mount } from '@vue/test-utils';
import Origamcolorpicker from './OrigamColorPicker';

describe('Spec Origamcolorpicker', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcolorpicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
