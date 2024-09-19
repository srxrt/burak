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


// H-TASK:

// shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin
// MASALAN: getPositive([1, -4, 2]) return qiladi "12"

function getPositive(arr: number[]): string {
	return arr.filter((ele) => ele > 0).join("");
}

console.log(getPositive([1, -4, 2]));


// H2-TASK:

// Shunday function tuzing, unga string argument pass bolsin. Function ushbu agrumentdagi
//digitlarni yangi stringda return qilsin
// MASALAN: getDigits("m14i1t") return qiladi "141"

function getDigits(str: string): string {
	let digits: string = "";
	for (let i = 0; i < str.length; i++) {
		if (Number.isFinite(+str[i])) {
			digits += str[i];
		}
	}

	return digits;
}

console.log(getDigits("m14i1t"));


// I-TASK:

// Shunday function yozing, u parametridagi array ichida eng kop takrorlangan
//  raqamni topib qaytarsin.
// MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4

function majorityElement(arr: number[]): number {
	let count: number = 0;
	let hNum: number = arr[0];
	let prevHighCount = 0;

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				count++;
			}
		}

		if (count > prevHighCount) {
			hNum = arr[i];
			prevHighCount = count;
		}

		count = 0;
	}
	return hNum;
}

console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4]));


// J-TASK:

// Shunday function yozing, u string qabul qilsin va
// string ichidagi eng uzun sozni qaytarsin.
// MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan"

function findLongestWord(str: string): string {
	let arr: string[] = str.split(" ");
	let longest: string = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (longest.length < arr[i].length) longest = arr[i];
	}
	return longest;
}

console.log(findLongestWord("I come from Uzbekistan"));
*/
// K-TASK:

// Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar sonini qaytarsin.
// MASALAN: countVowels("string") return 1;

function countVowels(str: string): number {
	let count: number = 0;
	str = str.toLowerCase();
	let arr: string[] = ["a", "e", "i", "o", "u"];
	for (let i = 0; i < str.length; i++) {
		if (arr.includes(str[i])) count++;
	}
	return count;
}

console.log(countVowels("deadpool"));
