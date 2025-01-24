import response from "./response.json";

const jsonResponse = JSON.parse(JSON.stringify(response));
for (let i = 0; i < 10; i++) {
  jsonResponse.history.push(JSON.parse(JSON.stringify(response)));
}
export default jsonResponse;
