import React, { Component } from 'react';

function dateStringConverter(props) {
  const datestring = props.getDate() + "-" + (props.getMonth()+1) + "-" + props.getFullYear();
  return datestring;
}

export default dateStringConverter;