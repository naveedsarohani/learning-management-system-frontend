import React from "react"

const Header = ({ title, total, icon }) => {
  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-md p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h2 className="text-xl font-bold text-gray-800">{total}</h2>
        {/* <p className={`text-sm font-medium text-green-500`}>+55%</p> */}
      </div>
      <div className="text-3xl">
        <span className="bg-[#21a3fe] flex justify-center items-center p-2 rounded-lg">
          {icon}
        </span>
      </div>
    </div>
  )
}

export default Header
