import React, { Component } from "react";
import axios from "axios";
import echarts from "echarts";
import { Button } from "antd";
import "../../style/main.css";
import { config } from "../../config";
//data
import categories from "./data/categories.json";
import initData from "./data/initData.json";
import { dialog } from "../fn/fn";
//fackData
// import fakeTunaData from "./data/testData.json";

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tunaData: null,
      newFishInfo: { detail: null },
      searchIndex: null,
      editFishInfo: null
    };
  }

  componentWillMount() {
    axios({
      method: "get",
      url: `${config.apiURL}/tunas`,
      timeout: 5000,
      withCredentials: true
    })
      .then(res => {
        console.log(res.data);
        if (res.data === "v_getTunas") {
          const nodes = res.data.map(node => {
            const newNode = {
              name: node.key,
              detail: node,
              value: "",
              category: categories[node.location]
            };
            return newNode;
          });
          const tunaData = { ...initData, nodes };
          this.setState({ tunaData });
          this.make_chart(tunaData, null);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps);
    const { tunaData } = this.state;

    const oldFishInfo = this.state.newFishInfo;
    const oldSearchIndex = this.state.searchIndex;
    const oldEditFishInfo = this.state.editFishInfo;
    const { newFishInfo, searchIndex, newEditFishInfo } = nextProps;

    if (newFishInfo !== oldFishInfo.detail) {
      const newNode = {
        name: newFishInfo.key,
        detail: newFishInfo,
        value: "",
        category: categories[newFishInfo.location]
      };

      const newTunaData = {
        ...tunaData,
        nodes: tunaData.nodes.concat(newNode)
      };

      this.setState({ newFishInfo: newNode, tunaData: newTunaData });
      this.make_chart(newTunaData, null);
    }

    if (searchIndex !== oldSearchIndex) {
      this.make_chart(tunaData, searchIndex);
      this.setState({ searchIndex });
    }

    if (newEditFishInfo !== oldEditFishInfo) {
      const newNode = {
        name: newEditFishInfo.key,
        detail: newEditFishInfo,
        value: "",
        category: categories[newEditFishInfo.location]
      };

      let nodePosition;
      const newNodes = tunaData.nodes.map((node, i) => {
        if (node.name === newNode.name) {
          nodePosition = i;
          return newNode;
        }
        return node;
      });

      const newTunaData = { ...tunaData, nodes: newNodes };
      this.props.cb_fishInfo({ data: newNode });
      this.make_chart(newTunaData, nodePosition);
      this.setState({ editFishInfo: newEditFishInfo, tunaData: newTunaData });
    }
  }
  rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  make_chart = (tunaData, searchIndex) => {
    // console.log("make_chart", tunaData, searchIndex);

    //TODO 把支線邏輯存在本地端

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
      console.log("params", params);
      this.props.cb_fishInfo(params);
    });

    if (searchIndex) {
      myCharts.dispatchAction({
        type: "focusNodeAdjacency",
        dataIndex: searchIndex
      });
    }
  };

  render() {
    const { tunaData } = this.state;

    if (!tunaData) {
      return (
        <div id="loading">
          <Button loading>
            Loading...
          </Button>
        </div>
      );
    }

    return (
      <div id="fish">
        <div id="demo" />;
      </div>
    );
  }
}
export default Fish;
