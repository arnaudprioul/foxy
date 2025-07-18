import { mount } from '@vue/test-utils';
import Foxuiotpinputfield from './FoxuiOtpInputField';

describe('Spec Foxuiotpinputfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiotpinputfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
