import { mount } from '@vue/test-utils';
import Origamdatepickerfield from './OrigamDatePickerField';

describe('Spec Origamdatepickerfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatepickerfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
