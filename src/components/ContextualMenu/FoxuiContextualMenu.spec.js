import { mount } from '@vue/test-utils';
import FoxuiContextualMenu from './FoxuiContextualMenu';

describe('Spec FoxuiContextualMenu', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiContextualMenu);
		expect(wrapper)
			.toBeTruthy();
	});
});
