/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, TiHeart } from "../../assets/icons";
import { popularity } from "../../reducers/CharacterSlice";
import { useState } from "react";
import Pagination from "../../utils/Pagination";
import { RoseCriptoIcon } from "../../assets/images/images";

const CharactersList = ({
  characters,
  totalPages,
  // currentPage,
  // setCurrentPage,
  pageSection,
  setPageSection,
}) => {
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.character);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  const handlePopularity = (charId) => {
    dispatch(popularity(charId));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-4">
        {characters?.length && Array.isArray(characters) ? (
          characters?.slice(0, 5)?.map((character) => (
            <div
              key={character.id}
              className="listing_box p-2 bg-[#242435] relative rounded-lg"
            >
              <Link to="/character-details" state={{ id: character.id }}>
                <img
                  src={character.character_photo}
                  className="w-full h-[184px] overflow-hidden rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  alt={`Character ${character.name}`}
                />
                <div className="listing_box_cont">
                  <p className="text-[13px] font-medium text-[#00a3ff] pb-1">
                    {character.name}
                  </p>
                  <p className="text-white text-[12px] leading-[20px] pb-1">
                    {character.introduction.length > 42
                      ? character.introduction.substring(0, 42) + "..."
                      : character.introduction}
                  </p>
                </div>
              </Link>
              <div className="cursor-pointer flex justify-between items-center px-[5px]">
                <div className="flex items-center">
                  <img
                    src={RoseCriptoIcon}
                    alt="RoseCriptoIcon"
                    className="w-3.5 h-3.5 mr-[2px]"
                  />
                  <p className="text-white text-[12px] leading-[20px]">5,000</p>
                </div>
                <TiHeart
                  className="text-[#00a3ff] hover:text-white"
                  onClick={() => {
                    handlePopularity(character.id);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-blue-500">No data found</p>
          </div>
        )}
      </div>
      {/* {characters?.length > 10 && Array.isArray(characters) ? (
        <Pagination
          totalPages={totalPages}
          pageSection={pageSection}
          setPageSection={setPageSection}
        />
      ) : (
        ""
      )} */}
    </>
  );
};

export default CharactersList;
