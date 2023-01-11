/** 
 * Given a string, make every consonant after a vowel uppercase. Can you do this with and without regex? 

Example: 

> capitalAfterVowel("hello world")
> "heLlo WoRld"

> capitalAfterVowel("xaabeuekadii")
> "xaaBeueKaDii"
 */

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

function capitalAfterVowel(input = '', options = {}) {
  if (!options.regex) {
    const builder = [input[0]];
    for (let i = 1; i < input.length; i++) {
      const currChar = input[i];
      const prevChar = input[i - 1];
      if (!VOWELS.includes(currChar) && VOWELS.includes(prevChar)) {
        builder.push(currChar.toUpperCase());

      } else {
        builder.push(currChar)
      }

    }

    return builder.join('');
  }

  return input.replace(/([aAeEiIoOuU])([^aeiouAEIOU])/g, (match, vowel, nonVowel) => {
    return `${vowel}${nonVowel.toUpperCase()}`;
  });
}


// "heLlo WoRld"
console.log({
  withouRegex: capitalAfterVowel("hello world"),
  regex: capitalAfterVowel("hello world", { regex: true })
});


// "xaaBeueKaDii"
console.log({
  withouRegex: capitalAfterVowel("xaabeuekadii"),
  regex: capitalAfterVowel("xaabeuekadii", { regex: true })
});