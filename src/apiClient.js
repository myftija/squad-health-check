import { get, post } from "axios";
import { Fail, Success } from "monet";

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSurveys = async () => {
  const path = "/surveys";
  try {
    const result = await get(baseUrl + path);
    const { surveys } = result.data;
    return Success(surveys);
  } catch (e) {
    return e.response && e.response.status === 402 ? Fail("ran_out_of_sheety") : Fail();
  }
};

const mapEvaluationsToRequestBody = (aspectToEvaluation) => {
  const sentimentToNumber = {
    bad: -1,
    ok: 0,
    good: 1,
  };
  const trendToNumber = {
    down: -1,
    nochange: 0,
    up: 1,
  };

  return Object.keys(aspectToEvaluation).reduce((requestBody, aspect) => {
    const { sentiment, trend } = aspectToEvaluation[aspect];
    return {
      ...requestBody,
      [`${aspect}Sentiment`]: sentimentToNumber[sentiment],
      [`${aspect}Trend`]: trendToNumber[trend],
    };
  }, {});
};

export const submitResponse = async (
  aspectToEvaluation,
  comment,
  surveyDate
) => {
  const path = "/responses";
  const requestBody = {
    response: {
      ...mapEvaluationsToRequestBody(aspectToEvaluation),
      comment,
      surveyDate,
    },
  };

  try {
    await post(baseUrl + path, requestBody);
    return Success();
  } catch (e) {
    return e.response && e.response.status === 402 ? Fail("ran_out_of_sheety") : Fail();
  }
};
