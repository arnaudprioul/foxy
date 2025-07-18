import { mount } from '@vue/test-utils';
import Origamsnackbar from './OrigamSnackbar';

describe('Spec Origamsnackbar', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsnackbar);
		expect(wrapper)
			.toBeTruthy();
	});
});
