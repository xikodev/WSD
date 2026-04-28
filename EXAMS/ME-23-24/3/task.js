
async function getFileMax(fileName) {
    const response = await fetch(fileName);

    if (!response.ok) {
        throw new Error(`Failed to load ${fileName}`);
    }

    const values = await response.json();

    if (!Array.isArray(values)) {
        throw new Error(`${fileName} does not contain an array`);
    }

    if (values.length === 0) {
        throw new Error(`${fileName} is empty`);
    }

    for (const value of values) {
        if (!Number.isInteger(value)) {
            throw new Error(`${fileName} contains invalid data`);
        }
    }

    return Math.max(...values);
}

async function getMax() {
    // Both files are processed in parallel as required by the task.
    const [firstMax, secondMax] = await Promise.all([
        getFileMax("first.json"),
        getFileMax("second.json")
    ]);

    return Math.max(firstMax, secondMax);
}

// The task explicitly asks to call getMax() and print either the result or the error flow.
getMax()
    .then((maxValue) => {
        console.log(maxValue);
    })
    .catch((error) => {
        console.log("An error occurred");
        console.log(error);
    });
