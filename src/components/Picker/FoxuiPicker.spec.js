import { mount } from '@vue/test-utils';
import Foxuipicker from './FoxuiPicker';

describe('Spec Foxuipicker', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuipicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
