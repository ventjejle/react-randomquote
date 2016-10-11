"use strict";

var QuoteBox = React.createClass({
  displayName: "QuoteBox",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        this.props.quote
      ),
      React.createElement(
        "p",
        { className: "text-right" },
        this.props.author
      )
    );
  }
});

var QuoteMachine = React.createClass({
  displayName: "QuoteMachine",

  getInitialState: function getInitialState() {
    return {
      quotesData: [],
      quote: "",
      author: ""
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    axios.get(this.props.source).then(function (result) {
      _this.setState({ quotesData: result.data });
      _this.setState({ quote: _this.state.quotesData[1].content.slice(3, -5) });
      _this.setState({ author: _this.state.quotesData[1].title });
    }).catch(function (error) {
      console.log(error);
    });
  },

  getRandomQuote: function getRandomQuote(event) {
    var rnd = Math.floor(Math.random() * 5);
    this.setState({ quote: this.state.quotesData[rnd].content.slice(3, -5) });
    this.setState({ author: this.state.quotesData[rnd].title });
    document.body.style.backgroundColor = '#A8DBA8';
    document.getElementById("tweet").style.backgroundColor = '#A8DBA8';
    document.getElementById("new").style.backgroundColor = '#A8DBA8';
  },

  tweetIt: function tweetIt(event) {
    var quoteTweet = this.state.quote;
    var auth = this.state.author;
    quoteTweet = quoteTweet.replace(/;/g, '%3b');
    window.open('https://twitter.com/intent/tweet?text="' + quoteTweet + '" -' + auth + '&hashtags=quotes');
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "inner well clearfix" },
      React.createElement(QuoteBox, { quote: this.state.quote, author: this.state.author }),
      React.createElement(
        "button",
        { id: "tweet", className: "btn btn-default pull-left butt", onClick: this.tweetIt },
        "Tweet"
      ),
      React.createElement(
        "button",
        { id: "new", className: "btn btn-default pull-right butt", onClick: this.getRandomQuote },
        "New Quote"
      )
    );
  }
});

ReactDOM.render(React.createElement(QuoteMachine, { source: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=5" }), document.getElementById("container"));