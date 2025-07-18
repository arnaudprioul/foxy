import { mount } from '@vue/test-utils';
import Foxuipickertitle from './FoxuiPickerTitle';

describe('Spec Foxuipickertitle', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuipickertitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
