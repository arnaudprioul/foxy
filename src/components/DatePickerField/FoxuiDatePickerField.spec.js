import { mount } from '@vue/test-utils';
import Foxuidatepickerfield from './FoxuiDatePickerField';

describe('Spec Foxuidatepickerfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepickerfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
