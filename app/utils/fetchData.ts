export default async function fetchData() {
    const response = await fetch('https://api.fais.al/product/8445290728791');
    const data = await response.json();
    return data;
}