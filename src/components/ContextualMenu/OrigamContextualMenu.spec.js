import { mount } from '@vue/test-utils';
import OrigamContextualMenu from './OrigamContextualMenu';

describe('Spec OrigamContextualMenu', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamContextualMenu);
		expect(wrapper)
			.toBeTruthy();
	});
});
