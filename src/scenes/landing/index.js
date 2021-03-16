import { faCaretDown, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigate } from "hookrouter";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

import { fetchSurveys } from "../../apiClient";
import { PlainContainer, SubHeader } from "../../components/misc";
import { Survey } from "./survey";

const Separator = styled.div`
  opacity: 0.3;

  > svg + svg {
    margin-left: 5px;
  }
`;

const Container = styled(PlainContainer)`
  padding: 40px 0;
`;

const Empty = styled.div`
  padding: 40px 30px 60px;
  text-align: center;

  > h1 {
    font-size: 14pt;
    font-weight: 700;
  }

  > p {
    font-size: 14pt;
    font-weight: 400;
    line-height: 1.5em;
    margin: auto;
    max-width: 450px;
  }
`;

const Icon = styled.div`
  color: #6633cc;
  font-size: 50pt;
`;

export const Landing = () => {
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    const loadSurveys = async () => {
      setIsLoading(true);
      const surveysOrFailure = await fetchSurveys();
      if (surveysOrFailure.isFail()) {
        const message =
          surveysOrFailure.fail() === "ran_out_of_sheety"
            ? "It appears we've ran into a Sheety situation :/ The monthly request limits of your Sheety subscription have been exceeded. Try again later or upgrade your subscription!"
            : "Something went terribly wrong. Try again later!";
        alert(message);
      }

      setSurveys(surveysOrFailure.success());
      setIsLoading(false);
    };
    loadSurveys();
  }, []);

  const renderSurveys = (surveys) =>
    surveys.length === 0 ? (
      <Empty>
        <Icon>
          <FontAwesomeIcon icon={faInbox} />
        </Icon>
        <h1>No surveys found</h1>
        <p>
          It seems there are no available surveys yet. Go to your surveys
          spreadsheet and add one!
        </p>
      </Empty>
    ) : (
      surveys.map((s, i) => (
        <Survey
          key={i}
          index={i + 1}
          date={s.date}
          responseCount={s.responseCount}
          completed={cookies[s.date] !== undefined}
          onClick={() => navigate(`/survey/${s.date}`)}
        />
      ))
    );

  const renderLoadingSkeleton = () => (
    <SkeletonTheme color="#f5f5f5" highlightColor="#fafafa">
      <Skeleton count={5} height={60} duration={2} />
    </SkeletonTheme>
  );

  return (
    <React.Fragment>
      <SubHeader>
        <Separator>
          {[...Array(5).keys()].map((i) => (
            <FontAwesomeIcon key={i} icon={faCaretDown} />
          ))}
        </Separator>
      </SubHeader>
      <Container>
        {isLoading ? renderLoadingSkeleton() : renderSurveys(surveys)}
      </Container>
    </React.Fragment>
  );
};
