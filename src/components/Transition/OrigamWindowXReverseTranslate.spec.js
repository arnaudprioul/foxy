import { mount } from '@vue/test-utils';
import Origamwindowxreversetranslate from './OrigamWindowXReverseTranslate.vue';

describe('Spec Origamwindowxreversetranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindowxreversetranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
