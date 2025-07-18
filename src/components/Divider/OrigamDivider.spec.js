import { mount } from '@vue/test-utils';
import Origamdivider from './OrigamDivider';

describe('Spec Origamdivider', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdivider);
		expect(wrapper)
			.toBeTruthy();
	});
});
