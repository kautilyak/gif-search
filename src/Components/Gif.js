import React from 'react';

const Gif = ({url, id}) => (
  <li className="gif-wrap">
    <img src={url} key={id} alt=""/>
  </li>
);

export default Gif;