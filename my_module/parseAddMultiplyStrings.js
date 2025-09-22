export default (numberString) => {
    numberString = numberString.replace(/,/g, " ").replace(/\s+/g, " ");
    let numArrayRaw = numberString.trim().split(" ")
    
    let numArray = [];
    numArrayRaw.forEach(item => {
        if (Number(item)) {
            numArray.push(Number(item))
        };
    });
    return numArray;
};

