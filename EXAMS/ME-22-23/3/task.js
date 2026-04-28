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

    const secondValues = new Set(secondArray);
    return firstArray.filter((value) => secondValues.has(value));
}

getOverlap("first.json", "second.json").then((overlap) => {
    console.log(overlap);
});
