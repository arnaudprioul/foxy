import { mount } from '@vue/test-utils';
import Foxuifilefield from './FoxuiFileField';

describe('Spec Foxuifilefield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuifilefield);
		expect(wrapper)
			.toBeTruthy();
	});
});
