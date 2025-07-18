import { mount } from '@vue/test-utils';
import Foxuialert from './FoxuiAlert';

describe('Spec Foxuialert', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuialert);
		expect(wrapper)
			.toBeTruthy();
	});
});
