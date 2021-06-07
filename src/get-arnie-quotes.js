const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async urls => {
    const requestsP = urls.map(url => httpGet(url)); // following naming convention of suffixing vars that refer to promises with a P
    return Promise.all(requestsP)
        .then(getResultsFromHttpResponses)
        .catch(e => {
            // TODO(zubin): handle network failures (non HTTP response errors) appropriately.  For now, rethrow.
            throw e;
        });
};

const getResultsFromHttpResponses = responses => {
    const results = [];
    const successKey = "Arnie Quote";
    const failureKey = "FAILURE";

    for (const res of responses) {
        let responseBody = JSON.parse(res.body);

        if (res.status === 200) {
            results.push({ [successKey]: responseBody.message });
        } else {
            results.push({ [failureKey]: responseBody.message });
        }
    }
    return results;
};

module.exports = {
    getArnieQuotes,
};
