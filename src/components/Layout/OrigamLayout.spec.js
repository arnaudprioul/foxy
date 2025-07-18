import { mount } from '@vue/test-utils';
import Origamlayout from './OrigamLayout';

describe('Spec Origamlayout', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlayout);
		expect(wrapper)
			.toBeTruthy();
	});
});
