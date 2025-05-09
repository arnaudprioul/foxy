import { mount } from '@vue/test-utils';
import Foxydatepickeryears from './FoxyDatePickerYears';

describe('Spec Foxydatepickeryears', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatepickeryears);
		expect(wrapper)
			.toBeTruthy();
	});
});
