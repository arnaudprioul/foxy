import { mount } from '@vue/test-utils';
import Foxuiimg from './FoxuiImg';

describe('Spec Foxuiimg', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiimg);
		expect(wrapper)
			.toBeTruthy();
	});
});
