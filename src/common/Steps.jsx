import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

const calcPoints = (vertical, marks, dots, step, min, max) => {
  warning(
    dots ? step > 0 : true,
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.'
  );
  const points = Object.keys(marks).map(parseFloat);
  if (dots) {
    for (let i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }
  return points;
};

const calcRailOverlaySize = (min, max, vertical, overlaySize) => {
  const range = max - min;
  const size = `${Math.abs(overlaySize - min) / range * 100}%`;

  if (vertical) {
    return {
      height: size,
      width: 'inherit',
      position: 'absolute',
      bottom: 0,
    };
  }

  return {
    height: 'inherit',
    width: size,
  };
};

const Steps = ({ prefixCls, vertical, marks, dots, step, included,
                lowerBound, upperBound, max, min, railOverlaySize, railOverlayDotStyle,
                dotStyle, activeDotStyle }) => {
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = `${Math.abs(point - min) / range * 100}%`;

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const isOverlay = railOverlaySize && railOverlaySize === point;
    let style = vertical ? { bottom: offset, ...dotStyle } : { left: offset, ...dotStyle };
    if (isActived) {
      style = { ...style, ...activeDotStyle };
    }
    if (isOverlay) {
      style = { ...style, ...railOverlayDotStyle };
    }

    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
      [`${prefixCls}-dot-overlay`]: isOverlay,
    });

    return <span className={pointClassName} style={style} key={point} />;
  });

  return <div className={`${prefixCls}-step`}>{elements}</div>;
};

export default Steps;
export { calcRailOverlaySize };
