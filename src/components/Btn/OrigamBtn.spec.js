import { mount } from '@vue/test-utils';
import Origambtn from './OrigamBtn';

describe('Spec Origambtn', function () {
	it('mounts', () => {
		const wrapper = mount(Origambtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
