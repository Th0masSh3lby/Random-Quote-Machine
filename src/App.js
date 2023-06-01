import "./App.scss";
import React from "react";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      color: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          quote: data.content,
          author: data.author,
          color: colors[0],
        });
      });
  }

  handleClick = () => {
    let bgc = colors[Math.floor(Math.random() * colors.length)];
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          quote: data.content,
          author: data.author,
          color: bgc,
        });
      });
  };

  render() {
    const { title } = this.props;
    const tweet = "https://twitter.com/intent/tweet?text=" + this.state.quote;
    const style = { backgroundColor: this.state.color };
    const textstyle = { color: this.state.color };
    return (
      <div style={style} class="App">
        <h1>{title}</h1>
        <div id="quote-box">
          <p id="text" style={textstyle}>
            {'"' + this.state.quote + '"'}
          </p>

          <h5 style={textstyle} id="author">
            <i>-{this.state.author}</i>
          </h5>
          <div class="quotes">
            <button style={style} class="t-quote">
              {" "}
              <a href={tweet} target="_blank" id="tweet-quote">
                Tweet
              </a>
            </button>
            <button style={style} id="new-quote" onClick={this.handleClick}>
              New Quote
            </button>
          </div>
        </div>
        <p>-by Aravind</p>
      </div>
    );
  }
}

function App() {
  return <RandomQuoteMachine />;
}

export default App;
