function formatString(input) {
    let trimmed = input.trim();

    let noSymbols = trimmed.replace(/[^a-zA-Z0-9\s]/g, '');

    let formatted = noSymbols.replace(/\s+/g, '_');

    return formatted.toLowerCase();
}

module.exports = formatString