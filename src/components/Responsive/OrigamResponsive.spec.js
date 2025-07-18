import { mount } from '@vue/test-utils';
import Origamresponsive from './OrigamResponsive';

describe('Spec Origamresponsive', function () {
	it('mounts', () => {
		const wrapper = mount(Origamresponsive);
		expect(wrapper)
			.toBeTruthy();
	});
});
