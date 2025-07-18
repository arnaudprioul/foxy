import { mount } from '@vue/test-utils';
import Origamimg from './OrigamImg';

describe('Spec Origamimg', function () {
	it('mounts', () => {
		const wrapper = mount(Origamimg);
		expect(wrapper)
			.toBeTruthy();
	});
});
