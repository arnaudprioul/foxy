import { mount } from '@vue/test-utils';
import Origamwindowxtranslate from './OrigamWindowXTranslate.vue';

describe('Spec Origamwindowxtranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindowxtranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
