const BASE_URL = "http://localhost:3000";
const PATH = {
    GENERATE_README: "/api/code/generate-readme",
    GENERATE_README_2: "/api/code/generate-readme2",
    GEMINI: "/api/code/gemini",
    GET_RESPONSE: "/getResponse",
};
const ENDPOINT = {
    GENERATE_README: `${BASE_URL}${PATH.GENERATE_README}`,
    GENERATE_README_2: `${BASE_URL}${PATH.GENERATE_README_2}`,
    GEMINI: `${BASE_URL}${PATH.GEMINI}`,
    TEST: `${BASE_URL}/test`,
    GET_RESPONSE: `${BASE_URL}${PATH.GET_RESPONSE}`,
};


export { BASE_URL, ENDPOINT, PATH };