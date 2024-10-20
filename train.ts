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


// L-TASK:

// Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni
// chappasiga yozib va sozlar ketma - ketligini buzmasdan stringni qaytarsin.
// MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc";

function reverseSentence(str: string): string {
	const arr: string[] = str.split(" ");
	const newStr: string = arr
		.map((ele) => {
			return ele.split("").reverse().join("");
		})
		.join(" ");
	return newStr;
}

console.log(reverseSentence("May the Force be with you"));


// M-TASK:

// Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
// MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];

function getSquareNumbers(arr: number[]): any {
	return arr.map((ele) => {
		return { number: ele, square: ele * ele };
	});
}
console.log(getSquareNumbers([11, 22, 33]));


// Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.
// MASALAN: palindromCheck("dad") return true;  palindromCheck("son") return false;

function palindromCheck(str: string): boolean {
	return str === str.split("").reverse().join("") ? true : false;
}

console.log(palindromCheck("kiyik"));


// O-TASK:

// Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array
// ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45

function calculateSumOfNumbers(arr: any): number {
	return arr.reduce((count: number, ele: any) => {
		return (count += typeof ele === "number" ? ele : 0);
	}, 0);
}
console.log(calculateSumOfNumbers([10, "15", { son: 10 }, true, 35]));

// P-TASK:

// Shunday function yozing, u object qabul qilsin va arrayni object arrayga otkazib arrayni qaytarsin qaytarsin.
// MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]

function objectToArray(obj: Object) {
	const keys = Object.keys(obj);
	const values = Object.values(obj);
	return keys.map((key, i) => [key, values[i]]);
}

console.log(
	objectToArray({
		a: 10,
		b: 20,
		name: "KEVIN",
		duringDay: "Bruce Wayne",
		atNight: "Batman",
	})
);


// Q-TASK:

// Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string.
//  Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin.
// MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false

function hasProperty(obj: Object, prop: string): boolean {
	const arr = Object.keys(obj);
	return arr.includes(prop);
}

console.log(
	hasProperty(
		{
			name: "BMW",
			model: "M3",
			year: 2005,
			game: "Need For Speed: Most Wanted",
			color: "White-Blue",
		},
		"game"
	)
);


// R-TASK:

// Shunday function yozing, u string parametrga ega bolsin.
// 	String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
// MASALAN: calculate("1+3") return 4;

function calculate(str: string): number {
	const arr: string[] = str.split("+");
	return arr.reduce((total, ele) => (total += Number(ele)), 0);
}

console.log(calculate("1+3"));

// S-TASK:

// Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va
// osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin
// MASALAN: missingNumber([3, 0, 1]) return 2

function missingNumber(arr: number[]) {
	let num = arr.sort()[0];
	for (let ele of arr) {
		if (ele !== num) return num;
		num++;
	}
}

console.log(missingNumber([3, 0, 1]));

// Shunday function yozing, u sonlardan tashkil topgan 2
// ta array qabul qilsin va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin
// MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]); return [0,3,4,4,6,30,31]

function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
	arr1.forEach((ele) => {
		arr2.push(ele);
	});
	return arr2.sort((a, b) => a - b);
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
// U-TASK:

// Shunday function yozing, uni number parametri bolsin va 0 dan berilgan parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return qilsin
// MASALAN: sumOdds(9) return 4; sumOdds(11) return 5;

function sumOdds(num: number): number {
	let count = 0;
	for (let i = 1; i < num; i = i + 2) {
		count++;
	}
	return count;
}
console.log(sumOdds(10));

// V-TASK:

// Shunday function yozing, uni string parametri bolsin va
// stringdagi harf va u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin.
// MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}
interface T {
	[key: string]: any;
}
function countChars(str: string) {
	const arr = str.split("");
	let count = 0;
	let counts: T = {};
	arr.forEach((ele) => {
		count = 0;
		arr.forEach((e) => {
			if (ele === e) count++;
		});
		counts[ele] = count;
	});
	return counts;
}

console.log(countChars("helllo"));
// W-TASK:

// Shunday function yozing, uni array va number parametrlari bolsin. Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin
// MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]]

function chunkArray(arr: number[], num: number) {
	let smallArr: number[] = [];
	let bigArr: number[][] = [];

	arr.map((ele, index) => {
		smallArr.push(ele);
		if ((index + 1) % num === 0) {
			bigArr.push(smallArr);
			smallArr = [];
		}
	});
	smallArr.length ? bigArr.push(smallArr) : bigArr;
	return bigArr;
}
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));



TASK X

Shunday function yozing, uni object va string parametrlari bo'lsin.
Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri
necha marotaba takrorlanganlini sanab qaytarsin.

Eslatma => Nested object'lar ham sanalsin

MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

Yuqoridagi misolda, birinchi argument object, ikkinchi argument 'model'.
Funktsiya, shu ikkinchi argument 'model', birinchi argument object
tarkibida kalit sifatida 2 marotaba takrorlanganligi uchun 2 soni return qilmoqda
*/
interface T {
	[key: string]: any;
}
let count = 0;
function countOccurrences(obj: T, str: string): number {
	const arr = Object.keys(obj);
	arr.map((ele) => {
		if (ele === str) count++;
		if (typeof obj[ele] === "object") countOccurrences(obj[ele], str);
		else return;
	});
	return count;
}

console.log(
	countOccurrences(
		{
			model: "Bugatti",
			steer: {
				model: "HANKOOK",
				size: 30,
			},
		},
		"model"
	)
);
