import { mount } from '@vue/test-utils';
import Foxuitextfield from './FoxuiTextField';

describe('Spec Foxuitextfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitextfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
