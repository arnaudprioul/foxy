import { mount } from '@vue/test-utils';
import Foxuidatepickermonth from './FoxuiDatePickerMonth';

describe('Spec Foxuidatepickermonth', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepickermonth);
		expect(wrapper)
			.toBeTruthy();
	});
});
