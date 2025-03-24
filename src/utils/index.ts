export function convertToHTML(input: string) {
	input = input.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');

	input = input.replace(/\[h2\](.*?)\[\/h2\]/g, '<h2>$1</h2>');
	input = input.replace(/\[h3\](.*?)\[\/h3\]/g, '<h3>$1</h3>');

	input = input.replace(/\[list\]/g, '<ul>');
	input = input.replace(/\[\/list\]/g, '</ul>');
	input = input.replace(/^\[\*\](.*)/gm, '<li>$1</li>');
	input = input.replace(/^(?=http:\/\/|https:\/\/)(.*)/gm, (p1) => {
		// 检测steam游戏
		const leftSub = p1.indexOf('app/');
		if (leftSub && p1.includes('store.steampowered.com')) {
			const id = parseFloat(p1.substring(leftSub + 4));
			return `<iframe src="https://store.steampowered.com/widget/${id}/" frameborder="0" width="100%" height="190"></iframe>`;
		}
		return `<a href='${p1}'>${p1}</a>`;
	});
	input = input.replace(/(\n)+/g, '<br/>');

	return input;
}

export default {};
