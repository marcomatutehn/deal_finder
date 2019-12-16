import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_AUTHORS = gql`
  query {
    tbl_deal_content {
      id
      article
      price
    }
  }
`;

const DealFinder = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return "loading...";
  if (error) return `error: ${error.message}`;

  return (
    <div>
      {data.tbl_deal_content.map((tbl_deal_content, index) => (
        <div key={index}>
          <h2>{tbl_deal_content.article}</h2>
          <h2>{tbl_deal_content.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default DealFinder;
export { GET_AUTHORS };
