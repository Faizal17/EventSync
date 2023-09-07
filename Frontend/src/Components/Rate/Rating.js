import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import classes from "./Rating.module.css";
const desc1 = {
  terrible: 1,
  bad: 2,
  normal: 3,
  good: 4,
  wonderful: 5,
};
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export const Rating = () => {
  const [value, setValue] = useState(0);
  const [total_review, setTotalRating] = useState();
  const [overallRating, setOverallRating] = useState();

  const getRatingByEventId = () => {};

  useEffect(() => {
    setTotalRating(25);
    setOverallRating(4);
  }, []);
  // setTotalRating(23);
  return (
    <div>
      <span className={classes.VRI}>
        <h4>Overall Rating</h4>
        <div className={classes.HRI}>
          <h2
            style={{
              paddingRight: 20,
            }}
          >
            {overallRating}
          </h2>
          <div className={classes.VRI}>
            <Rate
              tooltips={desc}
              onChange={setValue}
              value={value}
              defaultValue={0}
            />
            <text
              style={{
                fontSize: 15,
              }}
            >
              Based on {total_review} reviews
            </text>
            {/* {value ? <span className="ant-rate-text">{`${value}`}</span> : ""} */}
          </div>
        </div>
      </span>
    </div>
  );
};
