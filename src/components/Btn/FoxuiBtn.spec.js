import { mount } from '@vue/test-utils';
import Foxuibtn from './FoxuiBtn';

describe('Spec Foxuibtn', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
