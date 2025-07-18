import { mount } from '@vue/test-utils';
import Foxuidatepickermonths from './FoxuiDatePickerMonths';

describe('Spec Foxuidatepickermonths', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepickermonths);
		expect(wrapper)
			.toBeTruthy();
	});
});
