import { mount } from '@vue/test-utils';
import FoxuiHighlight from './FoxuiHighlight';

describe('Spec FoxuiHighlight', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiHighlight);
		expect(wrapper)
			.toBeTruthy();
	});
});
