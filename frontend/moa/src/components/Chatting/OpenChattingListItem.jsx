import React, { useState, useEffect } from 'react';

import OpenChattingEntrance from './OpenChattingEntrance';

function OpenChattingListItem(props) {
  const { id, title, description, member_id, participate } = props;

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>참여자 수: {participate.length}</p>
    </div>
  );
}

export default OpenChattingListItem;