import { mount } from '@vue/test-utils';
import Foxuibottomnav from './FoxuiBottomNav';

describe('Spec Foxuibottomnav', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibottomnav);
		expect(wrapper)
			.toBeTruthy();
	});
});
