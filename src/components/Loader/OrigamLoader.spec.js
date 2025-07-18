import { mount } from '@vue/test-utils';
import Origamloader from './OrigamLoader';

describe('Spec Origamloader', function () {
	it('mounts', () => {
		const wrapper = mount(Origamloader);
		expect(wrapper)
			.toBeTruthy();
	});
});
