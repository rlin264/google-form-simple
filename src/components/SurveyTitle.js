import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SurveyTitle({ title, handleChangeTitle, preview=false }) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }


  return (
    <Title>
      <Heading>
        {editing ? (
          <input type="text" value={title} onChange={handleChangeTitle} />
        ) : (
          title
        )}
      </Heading>
      {!preview ? (
        <button onClick={toggleEditing} style={{"margin-right":"1vh"}}>
        {editing ? (
          <>
            <FontAwesomeIcon icon={["fas", "save"]} fixedWidth />
            Save Title
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={["fas", "pen"]} fixedWidth />
            Edit Title
          </>
        )}
      </button>
      ) : (
        <></>
      )}
      
    </Title>
  );
}

const Title = styled.div`
  // display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  // flex: 1 0;
  // margin-right: 0.3em;
`;
