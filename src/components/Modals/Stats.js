import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResetIcon from "../../Icons/ResetIcon";
import classes from "./Stats.module.css";
import ModalLayout from "../layouts/ModalLayout";

const Stats = (props) => {
  const answer = useSelector((state) => state.wordle.answer);
  const [meaningObj, setMeaningObj] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchMeaning = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`
        );

        const data = await response.json();

        setMeaningObj(data[0]?.meanings[0]);
        console.log(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMeaning();
  }, [answer]);

  console.log(meaningObj);
  return (
    <>
      <ModalLayout close={props.close}>
        <h2 className={classes.statsHead}>Statistics</h2>
        <div className={classes.shareAndPlay}>
          <div className={classes.next}>
            <span>next word:</span>
            <button className={classes.resetIcon} onClick={props.regenerate}>
              <ResetIcon />
            </button>
          </div>
          <div className={classes.share}>
            <button>share</button>
          </div>
        </div>
        <div className={classes.answer}>
          {isLoading && <h4>Loading...</h4>}
          {!isLoading && (
            <h3>
              {answer}
              <i>{`(${meaningObj?.partOfSpeech})`}</i>
            </h3>
          )}
          {meaningObj?.definitions.map((defi, i) => {
            if (i < 2) {
              return (
                <ul className={classes.list} key={i}>
                  {!isLoading && <li>{defi.definition}</li>}
                </ul>
              );
            }
          })}
        </div>
      </ModalLayout>
    </>
  );
};

export default Stats;
