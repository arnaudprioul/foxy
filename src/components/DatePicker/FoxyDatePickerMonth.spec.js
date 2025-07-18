import { mount } from '@vue/test-utils';
import Foxydatepickermonth from './FoxyDatePickerMonth';

describe('Spec Foxydatepickermonth', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatepickermonth);
		expect(wrapper)
			.toBeTruthy();
	});
});
