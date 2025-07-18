import { mount } from '@vue/test-utils';
import Origamotpinputfield from './OrigamOtpInputField';

describe('Spec Origamotpinputfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamotpinputfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
