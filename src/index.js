module.exports = function check(str, bracketsConfig) {
    const openBrackets = {};
    const closeBrackets = {};
    const stack = [];
    //get 2 object key = brackets and value = oposite brackets
    for (let i = 0; i < bracketsConfig.length; i++) {
        const item = bracketsConfig[i],
            open = item[0],
            close = item[1];
        openBrackets[open] = close;
        closeBrackets[close] = open;
    }
    // check brackets and pop or push stack
    for (let i = 0; i < str.length; i++) {
        const item = str[i];
        if (item in openBrackets && item in closeBrackets) {
            if (stack.indexOf(closeBrackets[item]) !== -1) {
                while (
                    stack.length > 0 &&
                    stack[stack.length - 1] !== closeBrackets[item]
                ) {
                    stack.pop();
                }
                stack.pop();
            } else {
                stack.push(item);
            }
        } else {
            if (item in openBrackets) {
                stack.push(item);
            } else {
                if (stack.indexOf(closeBrackets[item]) === -1) {
                    return false;
                }
                while (
                    stack.length > 0 &&
                    stack[stack.length - 1] !== closeBrackets[item]
                ) {
                    stack.pop();
                }
                stack.pop();
            }
        }
    }
    if (stack.length > 0) {
        return false;
    }
    return true;
};
