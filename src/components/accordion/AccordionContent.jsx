import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { FaLock } from "react-icons/fa"
import { useDelete } from "../../contexts/Delete"
import ActionButton from "../global/ActionButton"
import { capitalize } from "../../uitils/functions/global"

export default function AccordionContent({
  tabTitle,
  hoverTitle,
  itemId,
  children,
  identity,
  noEdit = false,
  noView = false,
  noAction = false,
  isLocked = false,
  currentTab,
  del,
}) {
  const { destroy } = useDelete()

  return (
    <div
      key={itemId}
      className=" bg-gradient-to-r from-[#25bffd] to-[#257bfe] overflow-hidden shadow-sm"
      title={capitalize(hoverTitle)}
    >
      <div
        className="w-full bg-gradient-to-r border-b-[1px] border-gray-500 from-[#25bffd] to-[#257bfe] text-white p-1 text-left font-medium  focus:outline-none"
        onClick={
          !isLocked &&
          (() =>
            currentTab.set((currentId) =>
              currentId === itemId ? null : itemId
            ))
        }
      >
        <div className="flex p-2 rounded justify-between items-center w-full order-10">
          {capitalize(tabTitle)}
          {isLocked ? (
            <FaLock />
          ) : currentTab.value == itemId ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          )}
        </div>
      </div>
      {/* Accordion Content */}
      {currentTab.value === itemId && (
        <div className="p-4 bg-gray-50">
          {children}
          {!noAction && (
            <div className="flex gap-2">
              {!noView && <ActionButton
                name={"View"}
                route={`./view-${identity}/${itemId}`}
                icon={""}
              />}

              {!noEdit && (
                <ActionButton
                  name={"Edit"}
                  route={`./edit-${identity}/${itemId}`}
                  icon={""}
                  color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
                />
              )}

              <ActionButton
                name={"Delete"}
                icon={""}
                onClick={() =>
                  destroy(`/${identity}s`, itemId, identity, del ?? null)
                }
                color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
