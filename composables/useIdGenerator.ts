export function useIdGenerator(
    start = 1,
    initialPrefix = 'D',
    length = 3
) {
	const currentId: Ref<number> = ref<number>(start);
	const prefix: Ref<string> = ref<string>(initialPrefix);
	function generateId(): string {
		const numberStr = String(currentId.value).padStart(length, '0');
		currentId.value++;
		return `${prefix.value}${numberStr}`;
	}

	const initializeFromExistingId = (latestId: string): void => {
		if (!latestId.startsWith(prefix.value)) {
			throw new Error(`ID does not start with prefix ${prefix.value}`);
		}
		const numberPart = latestId.slice(prefix.value.length);
		const parsedNumber = parseInt(numberPart, 10);

		if (!isNaN(parsedNumber)) {
			currentId.value = parsedNumber + 1;
		}
	}

	return {
		prefix,
		currentId,
		generateId,
		initializeFromExistingId
	};
}
