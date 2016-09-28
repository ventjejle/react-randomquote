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
      quotesData: {}
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    axios.get(this.props.source).then(function (result) {
      //console.log(result.data[0]);
      _this.setState({ quotesData: result.data[0] });
    });
  },

  getRandomQuote: function getRandomQuote() {
    var _this2 = this;

    var str = Math.floor(Math.random() * 2000) + 1000;
    var quotesResult = {};
    quotesResult.content = "Random Error. Click Once more";
    quotesResult.title = "Random Error";
    axios.get("http://quotesondesign.com/wp-json/posts/" + str).then(function (result) {
      console.log(result);
      _this2.setState({ quotesData: result.data });
      // if(result.data instanceof Array) {
      //   this.setState({quotesData: quotesResult});
      // } else {
      //   this.setState({quotesData: result.data}); 
      // }
    }).catch(function (error) {
      console.log(error);
      _this2.setState({ quotesData: quotesResult });
    });
  },

  render: function render() {
    //var quotequote = this.state.quotesData.content.slice(3,-5);
    return React.createElement(
      "div",
      { className: "inner well clearfix" },
      React.createElement(QuoteBox, { quote: this.state.quotesData.content, author: this.state.quotesData.title }),
      React.createElement(
        "button",
        { className: "btn btn-default pull-left" },
        "Tweet"
      ),
      React.createElement(
        "button",
        { className: "btn btn-default pull-right", onClick: this.getRandomQuote },
        "New Quote"
      )
    );
  }
});

ReactDOM.render(React.createElement(QuoteMachine, { source: "http://quotesondesign.com/wp-json/posts?filter[orderby]=randfilter[posts_per_page]=1" }), document.getElementById("container"));