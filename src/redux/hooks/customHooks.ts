import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";

export const useFetching = (someFetchActionCreator: AppDispatch) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(someFetchActionCreator());
  }, []);
};
