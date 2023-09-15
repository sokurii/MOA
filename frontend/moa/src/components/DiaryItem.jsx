import React from 'react';

function DiaryItem(props) {
  const title = props.title;
  const image = props.image;
  const date = props.date;
  const time = props.time;

  return (
    <div>
      <div>
        { image }
      </div>
      <div>
        <div>
          <h1>{ title }</h1>
        </div>
        <div>
          <h4>{ date }</h4>
          <h5>{ time }</h5>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default DiaryItem;