import { mount } from '@vue/test-utils';
import Origambadge from './OrigamBadge';

describe('Spec Origambadge', function () {
	it('mounts', () => {
		const wrapper = mount(Origambadge);
		expect(wrapper)
			.toBeTruthy();
	});
});
