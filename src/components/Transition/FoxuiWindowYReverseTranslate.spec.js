import { mount } from '@vue/test-utils';
import Foxuiwindowyreversetranslate from './FoxuiWindowYReverseTranslate.vue';

describe('Spec Foxuiwindowyreversetranslate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindowyreversetranslate);
		expect(wrapper)
			.toBeTruthy();
	});
});
