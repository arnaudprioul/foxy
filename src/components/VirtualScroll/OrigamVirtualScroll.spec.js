import { mount } from '@vue/test-utils';
import Origamvirtualscroll from './OrigamVirtualScroll';

describe('Spec Origamvirtualscroll', function () {
	it('mounts', () => {
		const wrapper = mount(Origamvirtualscroll);
		expect(wrapper)
			.toBeTruthy();
	});
});
