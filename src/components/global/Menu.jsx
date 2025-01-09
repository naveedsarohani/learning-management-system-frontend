import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <ul className="flex mt-2 md:px-60 justify-around bg-gray-50 border-b border-gray-200 p-4 text-sm font-medium">
      <li className="relative group">
        <Link
          to={"/me"}
          className="text-gray-700 hover:text-black transition-colors"
        >
          All Courses
        </Link>
        <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-black group-hover:w-full transition-all"></div>
      </li>
      <li className="relative group">
        <Link
          to={"/me/courses"}
          className="text-gray-700 hover:text-black transition-colors"
        >
          My Course
        </Link>
        <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-black group-hover:w-full transition-all"></div>
      </li>
      <li className="relative group">
        <Link
          to={"/me/exams"}
          className="text-gray-700 hover:text-black transition-colors"
        >
          Exams/Tests
        </Link>
        <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-black group-hover:w-full transition-all"></div>
      </li>
    </ul>
  )
}

export default Menu
