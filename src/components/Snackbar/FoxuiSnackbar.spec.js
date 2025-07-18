import { mount } from '@vue/test-utils';
import Foxuisnackbar from './FoxuiSnackbar';

describe('Spec Foxuisnackbar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisnackbar);
		expect(wrapper)
			.toBeTruthy();
	});
});
