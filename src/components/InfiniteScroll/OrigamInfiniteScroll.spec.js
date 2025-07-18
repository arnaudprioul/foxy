import { mount } from '@vue/test-utils';
import Origaminfinitescroll from './OrigamInfiniteScroll';

describe('Spec Origaminfinitescroll', function () {
	it('mounts', () => {
		const wrapper = mount(Origaminfinitescroll);
		expect(wrapper)
			.toBeTruthy();
	});
});
