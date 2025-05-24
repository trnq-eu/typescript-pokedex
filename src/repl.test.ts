import { cleanInput } from "./repl";

import { describe, expect, test } from "vitest";

describe.each(
    [
    {
        input: " hello world ",
        expected: ["hello", "world"]
    },
    {
        input: " just in time 4 ever ",
        expected: ["just", "in", "time", "4", "ever"]
    },
    {
        input: " ",
        expected: []
    },
    {
        input: "",
        expected: []
    },
    {
        input: "pokemon   ",
        expected: ["pokemon"]
    },
    
    ]
)("cleanInput($input)", ({ input, expected}) => {
    test(`Expected: ${expected}`, () => {

    const actual = cleanInput(input);
    console.log(`Input: "${input}"`); // Aggiunto per il debug
    console.log(`Actual:`, actual);   // Aggiunto per il debug
    console.log(`Expected:`, expected); // Aggiunto per il debug

    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
        expect(actual[i]).toBe(expected[i]);
    }
});
});