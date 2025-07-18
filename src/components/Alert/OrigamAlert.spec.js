import { mount } from '@vue/test-utils';
import Origamalert from './OrigamAlert';

describe('Spec Origamalert', function () {
	it('mounts', () => {
		const wrapper = mount(Origamalert);
		expect(wrapper)
			.toBeTruthy();
	});
});
