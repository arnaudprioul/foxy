import { mount } from '@vue/test-utils';
import Origamwindowyreversetranslate from './OrigamWindowYReverseTranslate.vue';

describe('Spec Origamwindowyreversetranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindowyreversetranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
