import { mount } from '@vue/test-utils';
import Origampicker from './OrigamPicker';

describe('Spec Origampicker', function () {
	it('mounts', () => {
		const wrapper = mount(Origampicker);
		expect(wrapper)
			.toBeTruthy();
	});
});
