import { mount } from '@vue/test-utils';
import Origambottomnav from './OrigamBottomNav';

describe('Spec Origambottomnav', function () {
	it('mounts', () => {
		const wrapper = mount(Origambottomnav);
		expect(wrapper)
			.toBeTruthy();
	});
});
