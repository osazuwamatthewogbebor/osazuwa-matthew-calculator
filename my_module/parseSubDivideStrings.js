export default (numberString) => {
    numberString = numberString.trim();
    return Number(numberString) ? Number(numberString) : null;
};

