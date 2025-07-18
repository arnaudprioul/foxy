import { mount } from '@vue/test-utils';
import Foxysystembar from './FoxySystemBar';

describe('Spec Foxysystembar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxysystembar);
		expect(wrapper)
			.toBeTruthy();
	});
});
