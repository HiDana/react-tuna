import React, { Component } from "react";
import echarts from "echarts";
import "../../style/main.css";

//fackData
import fakeTunaData from "./data/testData.json";

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tunaData: fakeTunaData,
      newFishInfo: { detail: null },
      searchIndex: null
    };
  }

  componentDidMount() {
    const { tunaData } = this.state;
    this.make_chart(tunaData, null);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps);
    const { tunaData } = this.state;

    const oldFishInfo = this.state.newFishInfo;
    const oldSearchIndex = this.state.searchIndex;
    const { newFishInfo, searchIndex } = nextProps;

    if (newFishInfo !== oldFishInfo.detail) {
      const categories = { 太平洋: 0, 大西洋: 1, 印度洋: 2, 北冰洋: 3, 南冰洋: 4, Other: 5 };

      const newNodes = {
        name: newFishInfo.key,
        detail: newFishInfo,
        value: 1,
        category: categories[newFishInfo.location]
      };

      const newTunaData = {
        ...tunaData,
        nodes: tunaData.nodes.concat(newNodes)
      };

      this.setState({ newFishInfo: newNodes, tunaData: newTunaData });
      this.make_chart(newTunaData, null);
    }

    if (searchIndex !== oldSearchIndex) {
      this.make_chart(tunaData, searchIndex);
      this.setState({ searchIndex });
    }
  }
  rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  make_chart = (tunaData, searchIndex) => {
    // const nodes_length = tunaData.nodes.length;
    // const renLinks = [];
    // for (let i = 0; i < this.rnd(nodes_length, nodes_length / 2); i++) {
    //   const renderLink = {
    //     source: this.rnd(nodes_length, 0),
    //     target: this.rnd(nodes_length, 0)
    //   };
    //   renLinks.push(renderLink);
    // }

    let option = {
      tooltip: {
        triggerOn: "mousemove|click"
      },
      legend: {
        data: [
          {
            name: "太平洋",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          },
          {
            name: "大西洋",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          },
          {
            name: "印度洋",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          },
          {
            name: "北冰洋",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          },
          {
            name: "南冰洋",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          },
          {
            name: "Other",
            icon: "path://M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
          }
        ]
      },
      series: [
        {
          type: "graph",
          layout: "force",
          animation: false,
          label: {
            normal: {
              position: "right",
              formatter: "{b}"
            }
          },
          draggable: true,
          data: tunaData.nodes.map(function(node, idx) {
            node.id = idx;
            return node;
          }),
          categories: tunaData.categories,
          force: {
            // initLayout: 'circular'
            // repulsion: 20,
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2
          },
          edges: [
            {
              source: 0,
              target: 1
            }
          ],
          focusNodeAdjacency: true
        }
      ]
    };

    let myCharts = echarts.init(document.getElementById("demo"));
    myCharts.setOption(option);

    myCharts.on("mouseover", params => {
      this.props.cb_fishInfo(params);
    });

    if (searchIndex) {
      myCharts.dispatchAction({
        type: "focusNodeAdjacency",
        dataIndex: 2
      });
    }
  };

  render() {
    return (
      <div id="fish">
        <div id="demo" />;
      </div>
    );
  }
}
export default Fish;
