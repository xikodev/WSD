async function getOverlap(firstFile, secondFile) {
    // Both files are loaded in parallel because they are independent.
    const [firstResponse, secondResponse] = await Promise.all([
        fetch(firstFile),
        fetch(secondFile)
    ]);

    const [firstArray, secondArray] = await Promise.all([
        firstResponse.json(),
        secondResponse.json()
    ]);

    // A Set makes overlap checks efficient and keeps the result order of the first array.
    const secondValues = new Set(secondArray);
    return firstArray.filter((value) => secondValues.has(value));
}

// The returned promise is consumed here and its result is written to the console.
getOverlap("first.json", "second.json").then((overlap) => {
    console.log(overlap);
});
