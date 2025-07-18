import { mount } from '@vue/test-utils';
import Foxydatepickerheader from './FoxyDatePickerHeader';

describe('Spec Foxydatepickerheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatepickerheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
