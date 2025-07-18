import { mount } from '@vue/test-utils';
import Foxuivirtualscroll from './FoxuiVirtualScroll';

describe('Spec Foxuivirtualscroll', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuivirtualscroll);
		expect(wrapper)
			.toBeTruthy();
	});
});
