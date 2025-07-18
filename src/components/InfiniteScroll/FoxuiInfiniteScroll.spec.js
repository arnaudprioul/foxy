import { mount } from '@vue/test-utils';
import Foxuiinfinitescroll from './FoxuiInfiniteScroll';

describe('Spec Foxuiinfinitescroll', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiinfinitescroll);
		expect(wrapper)
			.toBeTruthy();
	});
});
