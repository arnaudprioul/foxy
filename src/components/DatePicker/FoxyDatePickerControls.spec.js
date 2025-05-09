import { mount } from '@vue/test-utils';
import FoxydatepickerControls from './FoxyDatePickerControls';

describe('Spec FoxydatepickerControls', function () {
	it('mounts', () => {
		const wrapper = mount(FoxydatepickerControls);
		expect(wrapper)
			.toBeTruthy();
	});
});
