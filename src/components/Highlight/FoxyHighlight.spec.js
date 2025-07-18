import { mount } from '@vue/test-utils';
import FoxyHighlight from './FoxyHighlight';

describe('Spec FoxyHighlight', function () {
	it('mounts', () => {
		const wrapper = mount(FoxyHighlight);
		expect(wrapper)
			.toBeTruthy();
	});
});
