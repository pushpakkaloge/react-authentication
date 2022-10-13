// import { findByLabelText } from "@testing-library/react";
import React from "react";
// import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// import classes from './UserProfile.module.css';

const style = {
  // height: 30,
  display:"flex",
  // flex-dire
  border: "1px solid green",
  margin: 10,
  padding: 8

};

class List extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
    hasMore: true
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1000);
  };

  render() {
    return (
      <div style={{"paddingLeft":'100px',"paddingRight":'100px',}}>
        {/* <h1>demo: react-infinite-scroll-component</h1> */}
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              <div style={{width:"100px","borderRadius":"50%"}}>
              <img style={{width:"100px"}} src={require('./profile3.jpg')} alt="profile"/>
              {/* <p>pk</p> */}
              </div>
              <div style={{marginLeft:"20px","textAlign":"left"}}>
              <p>Name: John</p>
              <p>Number:9088786689</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

// render(<App />, document.getElementById("root"));
export default List;