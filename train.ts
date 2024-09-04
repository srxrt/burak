console.log("Train Area");

/*
function getHighestIndex(arr: number[]): number {
	let hIndex: number = 0;

	for (let i: number = 0; i < arr.length; i++) {
		if (arr[i] > arr[i + 1] && arr[i] > arr[hIndex]) {
			hIndex = i;
		} else if (arr[i + 1] > arr[hIndex]) {
			hIndex = i + 1;
		}
	}

	return hIndex;
}

console.log(getHighestIndex([5, 21, 12, 21, 8]));
*/

// H-TASK:

// shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin
// MASALAN: getPositive([1, -4, 2]) return qiladi "12"

function getPositive(arr: number[]): string {
	return arr.filter((ele) => ele > 0).join("");
}

console.log(getPositive([1, -4, 2]));
