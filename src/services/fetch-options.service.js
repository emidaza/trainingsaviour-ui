export default function fetchOptions(method) {
    return {
        method: method ? method : 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}