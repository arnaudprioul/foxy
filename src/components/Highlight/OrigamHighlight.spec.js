import { mount } from '@vue/test-utils';
import OrigamHighlight from './OrigamHighlight';

describe('Spec OrigamHighlight', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamHighlight);
		expect(wrapper)
			.toBeTruthy();
	});
});
