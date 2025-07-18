import { mount } from '@vue/test-utils';
import Origamcard from './OrigamCard';

describe('Spec Origamcard', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcard);
		expect(wrapper)
			.toBeTruthy();
	});
});
