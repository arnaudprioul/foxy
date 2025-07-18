import { mount } from '@vue/test-utils';
import Origamlist from './OrigamList';

describe('Spec Origamlist', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlist);
		expect(wrapper)
			.toBeTruthy();
	});
});
