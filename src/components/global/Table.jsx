export default function Table({ isLoaing, ths, tds }) {
    return isLoaing ? <h1>Loading...</h1> : <table border="true">
        <thead>
            <tr>{ths}</tr>
        </thead>
        <tbody>
            {tds}
        </tbody>
    </table>
}