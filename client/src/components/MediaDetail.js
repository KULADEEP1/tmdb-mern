import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDataAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
const MediaDetail = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await getMovieDataAPI(id, type);
      console.log(response.data);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return <div>MediaDetail</div>;
};

export default MediaDetail;
