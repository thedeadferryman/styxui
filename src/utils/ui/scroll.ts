const scrollToElement = (
	container: HTMLElement,
	target: HTMLElement,
	options?: ScrollOptions,
) => {
	const screenOffset = target.offsetTop - container.scrollTop;

	if (
		screenOffset > (container.clientHeight - target.clientHeight)
	) {
		container.scrollTo({
			...options,
			top: target.offsetTop - (container.clientHeight - target.clientHeight),
		});
	}
	if (screenOffset < target.clientHeight) {
		container.scrollTo({
			...options,
			top: target.offsetTop,
		});
	}
};

const scrollToId = (root: HTMLElement, id: string, options?: ScrollOptions) => {
	const target = root.querySelector(`#${id}`);

	if (target instanceof HTMLElement) {
		scrollToElement(root, target, options);
	}
};

const scroll = (root: HTMLElement, options?: ScrollOptions) => ({
	toElement: (
		element: HTMLElement,
	) => scrollToElement(root, element, options),
	toId: (id: string) => scrollToId(root, id, options),
});

export default scroll;