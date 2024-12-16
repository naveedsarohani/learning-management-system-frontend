export default function Table({ isLoaing, ths, tds }) {
  return isLoaing ? (
    <h1>Loading...</h1>
  ) : (
    <table className="  w-full border-collapse border  border-gray-300 rounded-lg shadow-md overflow-hidden">
      <thead className="h-10 ">
        <tr className=" p-10 text-left text-white text-sm font-medium  bg-gradient-to-r from-[#21bffd] to-[#217bfe]">
          {ths}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 ">{tds}</tbody>
    </table>
  )
}
