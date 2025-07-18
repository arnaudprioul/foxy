import { mount } from '@vue/test-utils';
import Foxuidatepickerheader from './FoxuiDatePickerHeader';

describe('Spec Foxuidatepickerheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatepickerheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
