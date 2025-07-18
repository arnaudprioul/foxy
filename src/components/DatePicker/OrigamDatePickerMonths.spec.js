import { mount } from '@vue/test-utils';
import Origamdatepickermonths from './OrigamDatePickerMonths';

describe('Spec Origamdatepickermonths', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepickermonths);
		expect(wrapper)
			.toBeTruthy();
	});
});
