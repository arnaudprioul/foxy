import { mount } from '@vue/test-utils';
import Origamprogress from './OrigamProgress';

describe('Spec Origamprogress', function () {
	it('mounts', () => {
		const wrapper = mount(Origamprogress);
		expect(wrapper)
			.toBeTruthy();
	});
});
