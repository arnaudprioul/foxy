import { mount } from '@vue/test-utils';
import Origamwindowytranslate from './OrigamWindowYTranslate.vue';

describe('Spec Origamwindowytranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindowytranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
