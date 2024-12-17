'use client';

import Widget from '@meursyphus/flitter-react';
import { BarChart, type BarChartScale } from '@meursyphus/headless-chart';
import {
  Text,
  Column,
  Container,
  EdgeInsets,
  Row,
  SizedBox,
  TextStyle,
  Padding,
  MainAxisSize,
  MainAxisAlignment,
  Flexible,
  Stack,
  Positioned,
  VerticalDirection,
  CrossAxisAlignment,
  FractionalTranslation,
  Offset,
  Opacity,
  FractionallySizedBox,
  Alignment,
  type Widget as Child,
  CustomPaint,
  Path,
  Rect,
  Size,
  ConstraintsTransformBox
} from '@meursyphus/flitter';

const IgnoreSize = ({
  ignoreHeight = false,
  ignoreWidth = false,
  child,
  alignment
}: {
  ignoreHeight?: boolean;
  ignoreWidth?: boolean;
  child?: Child;
  alignment?: Alignment;
}) => {
  let constraintsTransform;

  if (ignoreWidth && ignoreHeight) {
    constraintsTransform = ConstraintsTransformBox.maxUnconstrained;
  } else if (ignoreWidth) {
    constraintsTransform = ConstraintsTransformBox.maxWidthUnconstrained;
  } else if (ignoreHeight) {
    constraintsTransform = ConstraintsTransformBox.maxHeightUnconstrained;
  } else {
    constraintsTransform = ConstraintsTransformBox.unmodified;
  }

  return SizedBox({
    width: ignoreWidth ? 0 : undefined,
    height: ignoreHeight ? 0 : undefined,
    child: ConstraintsTransformBox({
      alignment,
      constraintsTransform,
      child
    })
  });
};

const data = {
  labels: ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM'],
  datasets: [
    {
      legend: '실주',
      values: [86, 156, 62, 22, 150, 59, 68]
    },
    {
      legend: '낙찰',
      values: [35, 115, 188, 148, 84, 193, 177]
    },
    {
      legend: '계약',
      values: [128, 70, 189, 48, 2, 77, 46]
    }
  ].reverse()
};
const backgroundColors = ['#97e3d5', '#61cdbb', '#e8a838'];

const Layout = (...[{ legends, plot }]: [{ legends: Child[]; plot: Child }]) =>
  Container({
    padding: EdgeInsets.only({ left: 50, bottom: 70 }),
    child: Stack({
      children: [
        Positioned({
          top: 0,
          left: 0,
          child: Text('사업 실적 (단위: 원)', {
            style: new TextStyle({
              fontSize: 14,
              color: '#999999',
              fontFamily: 'Noto Sans JP'
            })
          })
        }),
        Row({
          children: [
            Flexible({ flex: 1, child: plot }),
            SizedBox({ width: 20 }),
            Column({
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: legends
            })
          ]
        })
      ]
    })
  });

const XAxisLabel = (...[{ name }]: [{ name: string }]) =>
  Column({
    mainAxisSize: MainAxisSize.min,
    children: [
      Container({
        width: 2,
        height: 6,
        color: '#BBBBBB'
      }),
      SizedBox({ height: 4 }),
      Text(name, {
        style: new TextStyle({
          fontFamily: 'Noto Sans JP',
          fontSize: 12,
          color: '#666666'
        })
      })
    ]
  });

const YAxisLabel = (...[{ name }]: [{ name: string }]) =>
  Padding({
    padding: EdgeInsets.only({ right: 4 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: 'Noto Sans JP',
        fontSize: 12,
        color: '#666666'
      })
    })
  });

const XAxisTick = () => SizedBox.shrink();
const YAxisTick = () =>
  Container({
    height: 2,
    width: 6,
    color: '#BBBBBB'
  });

const YAxis = ({ labels, tick }: { labels: Child[]; tick: Child }) =>
  Container({
    height: Infinity,
    child: Row({
      mainAxisSize: MainAxisSize.min,
      children: [
        Column({
          verticalDirection: VerticalDirection.up,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: labels.map((label, index) =>
            Opacity({
              opacity: labels.length - 1 === index ? 0 : 1,
              child: Row({
                mainAxisSize: MainAxisSize.min,
                children: [
                  IgnoreSize({ child: label, ignoreHeight: true }),
                  FractionalTranslation({
                    translation: new Offset({ x: 0, y: index !== 0 ? 0 : 1 }),
                    child: tick
                  })
                ]
              })
            })
          )
        })
      ]
    })
  });

const xAxisLine = () =>
  Container({
    color: '#EEEEEE',
    height: 2,
    width: Infinity
  });

const Series = (
  ...[{ barGroups }, { scale }]: [{ barGroups: Child[] }, { scale: BarChartScale }]
) => {
  const count = (scale.max - scale.min) / scale.step;
  return Stack({
    children: [
      Column({
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: Array.from({ length: count + 1 }, (_, index) =>
          Container({
            height: 2,
            color: index !== count && index !== 0 ? '#EEEEEE' : 'transparent'
          })
        )
      }),
      Container({
        height: Infinity,
        child: Row({
          crossAxisAlignment: CrossAxisAlignment.end,
          children: barGroups.map((barGroup) => Flexible({ flex: 1, child: barGroup }))
        })
      })
    ]
  });
};

const Legend = (...[{ name, index }]: [{ name: string; index: number }]) =>
  Padding({
    padding: EdgeInsets.only({ top: 2 }),
    child: Row({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container({
          width: 20,
          height: 20,
          color: backgroundColors[index]
        }),
        SizedBox({ width: 8 }),
        Text(name, {
          style: new TextStyle({
            fontFamily: 'Noto Sans JP',
            fontSize: 12,
            color: '#777777'
          })
        })
      ]
    })
  });

const Bar = (
  ...[{ legend, value }, { data }]: [
    { legend: string; value: number },
    { data: { datasets: { legend: string }[] } }
  ]
) => {
  const index = data.datasets.findIndex((dataset) => dataset.legend === legend);
  const backgroundColor = backgroundColors[index];
  return Container({
    width: Infinity,
    margin: EdgeInsets.symmetric({ horizontal: 11 }),
    height: Infinity,
    color: backgroundColor,
    child: Stack({
      alignment: Alignment.center,
      clipped: true,
      children: [
        CustomPaint({
          size: Size.maximum(),
          painter: {
            svg: {
              createDefaultSvgEl(context) {
                return { bar: context.createSvgEl('path') };
              },
              paint({ bar }, size) {
                if (legend === 'fries') {
                  const path = new Path();
                  bar.setAttribute('fill', '#38bcb2');
                  for (let y = 2; y < size.height; y += 8) {
                    for (let x = 2 + (y % 16) / 2; x < size.width; x += 10) {
                      path.addOval(
                        Rect.fromCircle({
                          center: new Offset({ x, y }),
                          radius: 2
                        })
                      );
                    }
                  }
                  bar.setAttribute('d', path.getD());
                }

                if (legend === 'sandwich') {
                  const path = new Path();
                  const { width, height } = size;
                  const stripeWidth = 5;
                  bar.setAttribute('stroke', '#eed312');
                  bar.setAttribute('stroke-width', stripeWidth.toString());
                  for (let y = -Math.max(width, height); y < Math.max(width, height); y += 12) {
                    path.moveTo({ x: width, y: y });
                    path.lineTo({ x: 0, y: y + width });
                  }
                  bar.setAttribute('d', path.getD());
                }
              }
            },
            canvas: {
              paint(context, size) {
                if (legend === 'fries') {
                  const path = new Path();
                  context.canvas.fillStyle = '#38bcb2';
                  for (let y = 2; y < size.height; y += 8) {
                    for (let x = 2 + (y % 16) / 2; x < size.width; x += 10) {
                      path.addOval(
                        Rect.fromCircle({
                          center: new Offset({ x, y }),
                          radius: 2
                        })
                      );
                    }
                  }
                  context.canvas.fill(path.toCanvasPath());
                }

                if (legend === 'sandwich') {
                  const path = new Path();
                  const { width, height } = size;
                  const stripeWidth = 5;
                  context.canvas.strokeStyle = '#eed312';
                  context.canvas.lineWidth = stripeWidth;
                  for (let y = -Math.max(width, height); y < Math.max(width, height); y += 12) {
                    path.moveTo({ x: width, y: y });
                    path.lineTo({ x: 0, y: y + width });
                  }
                  context.canvas.stroke(path.toCanvasPath());
                }
              }
            }
          }
        }),
        Text(value > 20 ? `${value}` : '', {
          style: new TextStyle({
            fontFamily: 'Noto Sans JP',
            fontSize: 11,
            color: '#777777'
          })
        })
      ]
    })
  });
};

const BarGroup = (
  ...[{ bars, values }, { scale }]: [{ bars: Child[]; values: number[] }, { scale: BarChartScale }]
) => {
  const ratios = values.map((value) => value / (scale.max - scale.min));
  return Column({
    mainAxisAlignment: MainAxisAlignment.end,
    mainAxisSize: MainAxisSize.min,
    children: bars.map((bar, index) =>
      FractionallySizedBox({
        alignment: Alignment.bottomCenter,
        heightFactor: ratios[index],
        child: bar
      })
    )
  });
};

const chart = BarChart({
  data,
  getScale() {
    return {
      min: 0,
      step: 50,
      max: 700
    };
  },
  custom: {
    layout: Layout,
    bar: Bar,
    xAxisLabel: XAxisLabel,
    yAxisLabel: YAxisLabel,
    yAxisTick: YAxisTick,
    xAxisTick: XAxisTick,
    legend: Legend,
    xAxisLine: xAxisLine,
    yAxis: YAxis,
    series: Series,
    barGroup: BarGroup,
    grid: () => SizedBox.shrink()
  }
});

export default function SupplierChart() {
  return <Widget width="auto" height="400px" widget={chart} renderer="canvas" />;
}
