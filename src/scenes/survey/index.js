import some from "lodash.some";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { submitResponse } from "../../apiClient";
import {
  BarButton,
  PlainContainer,
  SubHeader,
  TextArea
} from "../../components/misc";
import { aspects } from "./aspects";
import { Completed } from "./completed";
import { FeedbackAspect } from "./feedbackAspect";

const initialEvaluations = aspects.reduce(
  (evals, aspect) => ({
    ...evals,
    [aspect.name]: { sentiment: null, trend: null },
  }),
  {}
);

export const Survey = (props) => {
  const { date } = props;
  const [aspectToEvaluation, setEvaluations] = useState(initialEvaluations);
  const [comment, setComment] = useState("");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [cookies, setCookie] = useCookies();

  const onFeedbackButtonClick = (aspect, newSentiment, newTrend) => {
    const { sentiment, trend } = aspectToEvaluation[aspect];

    const newAspectEvaluation =
      newSentiment === sentiment && newTrend === trend
        ? { sentiment: null, trend: null }
        : { sentiment: newSentiment, trend: newTrend };

    setEvaluations({
      ...aspectToEvaluation,
      [aspect]: newAspectEvaluation,
    });
  };

  const onSubmit = async () => {
    setisLoading(true);
    const result = await submitResponse(aspectToEvaluation, comment, date);

    if (result.isFail()) {
      const message =
        result.fail() === "ran_out_of_sheety"
          ? "It appears we've ran into a Sheety situation :/ The monthly request limits of your Sheety subscription have been exceeded. Try again later or upgrade your subscription!"
          : "Something went terribly wrong. Try again later!";
      alert(message);
      setisLoading(false);
      return;
    }

    setCookie(date, new Date().toISOString(), { path: "/" });
    setSurveySubmitted(true);
    setisLoading(false);
  };

  const feedbackButtonSelected = (aspect, selectedSentiment, selectedTrend) => {
    const { sentiment, trend } = aspectToEvaluation[aspect];
    return sentiment === selectedSentiment && trend === selectedTrend;
  };

  const canSubmit = !some(Object.values(aspectToEvaluation), [
    "sentiment",
    null,
  ]);

  const renderCompletedPage = () => (
    <Completed
      presentlySubmitted={surveySubmitted}
      completedOn={new Date(cookies[date])}
    />
  );

  const renderSurveyContents = () => (
    <PlainContainer>
      <div>
        {aspects.map((a, i) => (
          <FeedbackAspect
            key={i}
            onFeedbackButtonClick={onFeedbackButtonClick.bind(this, a.name)}
            feedbackButtonSelected={feedbackButtonSelected.bind(this, a.name)}
          >
            {a.displayName}
          </FeedbackAspect>
        ))}
      </div>

      <TextArea
        placeholder="Additional remarks..."
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <BarButton disabled={!canSubmit} onClick={onSubmit}>
        {isLoading ? "Submitting..." : "Submit"}
      </BarButton>
    </PlainContainer>
  );

  return (
    <React.Fragment>
      <SubHeader>
        {"survey on " +
          new Date(date).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </SubHeader>
      {surveySubmitted || cookies[date]
        ? renderCompletedPage()
        : renderSurveyContents()}
    </React.Fragment>
  );
};
