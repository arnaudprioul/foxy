import { mount } from '@vue/test-utils';
import Origamsystembar from './OrigamSystemBar';

describe('Spec Origamsystembar', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsystembar);
		expect(wrapper)
			.toBeTruthy();
	});
});
