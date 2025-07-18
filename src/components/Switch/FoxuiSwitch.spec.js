import { mount } from '@vue/test-utils';
import Foxuiswitch from './FoxuiSwitch';

describe('Spec Foxuiswitch', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiswitch);
		expect(wrapper)
			.toBeTruthy();
	});
});
